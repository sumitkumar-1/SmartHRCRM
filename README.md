# SmartHRCRM

As part of term assignment, I have created a web application that uses Angular for the frontend and Node Express for the backend. The website is hosted on AWS and utilizes various AWS services such as ECR, ECS, S3, Dynamo DB, Lambda, SNS, Secret Manager, VPC, Subnet, Security Groups, Internet Gateway, Cluster, and Load Balancer.

The purpose of the web application is to address the challenges faced by consultancy companies in hiring new resources. The application offers a centralized platform for maintaining all vendor and candidate profiles. The application also enables the tracking of candidate demands and the on boarding process for new resources. One of the most useful features of the application is its ability to notify users by email, keeping all stakeholders informed about the latest developments. Overall, the web application offers a comprehensive solution for consultancy companies, streamlining their resource hiring process and increasing efficiency.

The web application's use of AWS services like ECR, ECS, and Dynamo DB ensures that the website is highly scalable, secure, and can handle high volumes of data. The application is designed to be user-friendly, with an intuitive interface that simplifies the process of managing vendor and candidate profiles. By leveraging the power of the cloud, the web application is accessible from anywhere, making it easy for users to access the platform and perform tasks remotely. With its comprehensive features and secure infrastructure, the web application has the potential to revolutionize the way consultancy companies approach resource hiring and on boarding.

# AWS Services used
* Elastic Container Service
* Elastic Container Registry
* Lambda
* S3
* DynamoDB
* Virtual Private Cloud (VPC)
* SNS
* Secret Manager
* Cloud Formation

# Deployment Model

For this project public cloud will be used for deployment model for below mentioned reason.
* Cost
* Scalability
* Flexibility
* Accessibility
* Security

# Delivery Model

For this project SaaS (Software as a service) will be used for delivery model for below mentioned reason.
* Cost-Effective
* Easy to use
* Scalability
* Flexibility
* Regular Updates
* Security

# Architecture

![image](https://github.com/sumitkumar-1/SmartHRCRM/assets/10169915/c4ae73da-8857-47f5-8231-c6e162e8baca)


# Deployment

Execute below script based on the OS you are operating from to deploy your application on AWS Cloud.

#### For Window Execute below script
```
.\deploy.bat
```

#### For Linux Execute below script
```
./deploy.sh
```
