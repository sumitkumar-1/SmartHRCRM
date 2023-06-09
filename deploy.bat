@echo off
REM ##############################################################################################################################################
REM STEP 0 - Build Application and copy to destination path
REM ##############################################################################################################################################

REM Get the current time
set start_time=%time%

cd frontend
cmd /c npm install
cmd /c npm run build
cd ..
xcopy /s /e /y .\frontend\dist\smart-hr-crm\* .\backend\views\

REM ##############################################################################################################################################
REM STEP 1 - Create Repository on ECR using cloudformation
REM ##############################################################################################################################################

set region=us-east-1
set paramFile=.\cloudformation\ecr.json
set templateFile=.\cloudformation\ecr.yml
set infraFile=.\cloudformation\infra.yml
set stackName=csci5409-b00904097-repo
set ecrRepository=230825027461.dkr.ecr.us-east-1.amazonaws.com

echo "Creating Repository on ECR"

set ERROR_FLAG=
aws cloudformation create-stack --stack-name %stackName% --template-body file://%templateFile% --parameter file://%paramFile% --region=%region% || set ERROR_FLAG=true
if defined ERROR_FLAG (
    echo "Error: Failed to create stack %stackName%"
    exit /b 1
)

aws cloudformation wait stack-create-complete --stack-name %stackName% --region %region%
if %ERRORLEVEL% NEQ 0 (
    echo "Error: Failed to create stack %stackName%"
    exit /b 1
)

echo "ECR Repository created!!"


REM ##############################################################################################################################################
REM STEP 2 - Build and Push Docker Image to ECR using cloudformation
REM ##############################################################################################################################################

set imageName=%stackName%

echo "Login to AWS ECR and change Docker registry"

REM Login to AWS ECR and change Docker registry
aws ecr get-login-password --region %region% | docker login --username AWS --password-stdin %ecrRepository%

echo "Building local Docker image"
REM Build local Docker image
docker build -t %imageName% . || (
  echo "Error: Failed to build Docker image"
  exit /b 1
)

echo "Tagging Docker image"
REM Tag Docker image
docker tag %imageName%:latest %ecrRepository%/%imageName%:latest || (
  echo "Error: Failed to tag Docker image"
  exit /b 1
)

REM Login to AWS ECR and change Docker registry
aws ecr get-login-password --region %region% | docker login --username AWS --password-stdin %ecrRepository%

echo "Pushing Docker image to ECR repository"
REM Push Docker image to ECR repository
docker push %ecrRepository%/%imageName%:latest || (
  echo "Error: Failed to push Docker image to ECR repository"
  exit /b 1
)

echo "Docker image pushed to ECR repository successfully"


REM ##############################################################################################################################################
REM STEP 3 - Deploy Docker image from ECR Repository to ECS, Infrastructure setup
REM ##############################################################################################################################################

aws cloudformation create-stack --stack-name %stackName%-infra --template-body file://%infraFile%
if %ERRORLEVEL% NEQ 0 (
    echo "Error: Failed during Infrastructure setup, stack=%stackName%-infra"
    exit /b 1
)

aws cloudformation wait stack-create-complete --stack-name %stackName%-infra --region %region%
if %ERRORLEVEL% NEQ 0 (
    echo "Error: Failed to create stack %stackName%-infra"
    exit /b 1
)

echo "Infrastructure Deployed Successfully !!"

REM Get the current time
set end_time=%time%

REM Calculate the duration in milliseconds
set /a duration=(1%end_time:~0,2%-100)*3600000 + (1%end_time:~3,2%-100)*60000 + (1%end_time:~6,2%-100)*1000 + (1%end_time:~9,2%-100)*10 - ((1%start_time:~0,2%-100)*3600000 + (1%start_time:~3,2%-100)*60000 + (1%start_time:~6,2%-100)*1000 + (1%start_time:~9,2%-100)*10)

REM Convert the duration to minutes
set /a duration=duration/60000

REM Print the start time, end time, and duration
echo Start time: %start_time%
echo End time: %end_time%
echo Duration: %duration% minutes