#!/bin/bash

##############################################################################################################################################
# STEP 1 - Create Repository on ECR using cloudformation
##############################################################################################################################################

region=us-east-1
paramFile=ecr.json
templateFile=ecr.yml
stackName=csci5409_b00904097_repo

aws cloudformation create-stack --stack-name $stackName --template-body file://$templateFile --parameter file://$paramFile --region=$region

##############################################################################################################################################
# STEP 2 - Build and Push Docker Image to ECR using cloudformation
##############################################################################################################################################

imageName=${stackName}

# Login to aws ECR and change docker registry
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 230825027461.dkr.ecr.us-east-1.amazonaws.com

# Build local docker image
docker build -t ${imageName} .

# Tag Docker Image
docker tag ${imageName}:latest 230825027461.dkr.ecr.us-east-1.amazonaws.com/${imageName}:latest

# Push Docker image to ECR repository
docker push 230825027461.dkr.ecr.us-east-1.amazonaws.com/${imageName}:latest


##############################################################################################################################################
# STEP 3 - Deploy Docker image from ECR Repository to ECS
##############################################################################################################################################


