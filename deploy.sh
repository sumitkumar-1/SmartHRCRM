#!/bin/bash

##############################################################################################################################################
# STEP 1 - Create Repository on ECR using cloudformation
##############################################################################################################################################

region=us-east-1
paramFile=./cloudformation/ecr.json
templateFile=./cloudformation/ecr.yml
infraFile=./cloudformation/infra.yml
stackName=csci5409-b00904097-repo
ecrRepository=230825027461.dkr.ecr.us-east-1.amazonaws.com

aws cloudformation create-stack --stack-name $stackName --template-body file://$templateFile --parameter file://$paramFile --region=$region
aws cloudformation wait stack-create-complete --stack-name $stackName --region $region

##############################################################################################################################################
# STEP 2 - Build and Push Docker Image to ECR using cloudformation
##############################################################################################################################################

imageName=${stackName}

# Login to aws ECR and change docker registry
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ecrRepository

# Build local docker image
docker build -t ${imageName} .

# Tag Docker Image
docker tag ${imageName}:latest $ecrRepository/${imageName}:latest

# Push Docker image to ECR repository
docker push $ecrRepository/${imageName}:latest


##############################################################################################################################################
# STEP 3 - Deploy Docker image from ECR Repository to ECS, Infrastructure setup
##############################################################################################################################################

aws cloudformation create-stack --stack-name %stackName%-infra --template-body file://$infraFile
