@echo off
REM ##############################################################################################################################################
REM STEP 1 - Create Repository on ECR using cloudformation
REM ##############################################################################################################################################

set region=us-east-1
set paramFile=.\cloudformation\ecr.json
set templateFile=.\cloudformation\ecr.yml
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
for /f "tokens=*" %%A in ('aws ecr get-login-password --region %region%') do set password=%%A
echo %password% | docker login --username AWS --password-stdin %ecrRepository%

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

echo "Pushing Docker image to ECR repository"
REM Push Docker image to ECR repository
docker push %ecrRepository%/%imageName%:latest || (
  echo "Error: Failed to push Docker image to ECR repository"
  exit /b 1
)

echo "Docker image pushed to ECR repository successfully"


REM ##############################################################################################################################################
REM STEP 3 - Deploy Docker image from ECR Repository to ECS
REM ##############################################################################################################################################

