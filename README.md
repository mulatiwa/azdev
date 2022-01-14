# AZdev

This example project came from the book GraphQL in Action.
The project is intended to demonstrate how to create a modern web app using GraphQL

# App Description
A graphQl based app for developers to assist them in performing their day to day tasks.

The a - z of developer resources. A searchable library of practical micro-documentation, errors and solutions, and general tips for software developers on how to perform certain tasks.
Its essentially a library of tasks that developers usually look up (e.g. stack overflow)

##  TechStack

Backend:
  - GraphQL
  - MongoDb
  - PostgreSQL

Frontend:
  - React

##  Pre-requisites
  - Mongodb (at least version 4) / Create an Atlas Cluster
  - Mongodb nodejs driver (at least version 4)
  - Node JS (at least version 14) 
  - PostgreSQL (at least version 14) 

##  Instructions
Create a .env (Server) file with the following variables:
  - HOST = localhost
  - API_PORT = 3000
  - MONGODB_PORT = 27017
  - PG_USER = 
  - PG_DB = azdev
  - PG_PWD = 
  - PG_PORT = 5432
Create a .env (Client) file with the following variables:
  - DEV_HOST = localhost
  - SERVER = 3000
  - CLIENT = 4000