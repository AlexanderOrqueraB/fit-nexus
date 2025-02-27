# FitNexus

![Version](https://img.shields.io/badge/version-1.0.0-blue)

A web application Fitness training tool that will be the Nexus between trainers and their clients

## Table of Contents

- [Documentation](#documentation)
- [Generate Open API Docs](#generate-open-api-docs)
- [View Open API Docs](#view-open-api-docs)
- [View Data Model](#view-data-model)
- [Tech Stack](#tech-stack)
- [Running the Application](#running-the-application)
    - [Full Application](#full-application)
    - [React Application Only](#react-application-only)
- [Features](#features)
- [Author](#author)

## Documentation

FitNexus is a web application that helps trainers manage their clients and design personalized routines. Clients can connect with personal trainers who will create customized routines and assign nutritional plans to help them achieve their goals.

Trainers can design training plans with specific routines and exercises that clients can view and follow. They can also manage their clients, create and assign nutritional plans. Both trainers and clients can create their profiles, access their personal data, and make modifications.

What this application does not do: It is not focused on nutrition or specific diet assignments, and communication between trainers and clients will not be done through the application.

## Generate Open API Docs

FitNexus uses the `openapi-gradle-plugin` to generate Open API docs. Configuration is in the `build.gradle` file under the `openApi {}` block.

### Steps:
1. Run the command (with the React build part commented out and Docker Desktop running)
   ```sh
   ./gradlew clean build generateOpenApiDocs
   ```
2. Copy [fit-nexus.json](build/docs/fit-nexus.json) into [Swagger editor](https://editor.swagger.io/), double check and share if you want!


## View Open API Docs
After start running the application:
*  [Raw JSON] (http://localhost:8080/api-docs)
*  [Swagger UI] (http://localhost:8080/swagger-ui/index.html)

## View Data Model 
(Database Markup Language definition)

* Use the database_X.Y.Z.dbml file and paste its content into (https://dbdiagram.io/d)

## Tech Stack

* **Client:** React
* **Server:** Springboot
* **Database:** PostgreSQL

## Running the Application
### Full Application
#### Steps:
1. Navigate to the main directory using terminal: \fit-nexus>
2. Use Docker Desktop to start a container with the database using [compose.yml](compose.yml)
3. Execute: 
   1. To run the application in real mode with the data you will create by using it:
      ```sh
      ./gradlew clean bootRun
      ```
   2. To run the application in development mode with fake data inserted directly into the database:
      ```sh
      ./gradlew bootRun --args='--spring.profiles.active=dev'
      ```
4. Open (http://localhost:8080/)

### React Application Only
#### Steps:
1. Navigate to this directory using terminal: [fitnexus-ui](src/frontend/fitnexus-ui) 
2. Execute:
    1. To run the application in real mode with the data you will create by using it:
       ```sh
       npm start
       ```
3. Open (http://localhost:3030/)

## Features
* Manage clients and trainers
* Design and assign personalized workout plans
* Create and assign nutritional plans
* Create and modify user profiles

## Autor

- [@AlexanderOrqueraB](https://www.github.com/AlexanderOrqueraB)

