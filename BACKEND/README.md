# README

Backend for docker demo project.

## Installation

#### Run below command to setup express-js server.

```
npm i
```

#### Run below commands to setup Database 

Install Postgres and start service

```
sudo apt install postgresql postgresql-contrib
service postgresql start
```
Alter password of default user and exit
```
sudo -u postgres psql
ALTER USER postgres PASSWORD 'fact123';
```
Login to postgress, create database and table.
```
psql -U postgres -h localhost
create database student_inventory;
use student_inventory;
CREATE TABLE STUDENTS(ID SERIAL PRIMARY KEY ,NAME TEXT NOT NULL,AGE INT NOT NULL,CLASS INT NOT NULL);
```

## Configuration
Database configuration can be added to config.js in config.
```
PG_USERNAME : Postgres user
PG_PASSWORD : Password for the user
DATABASE : Your database name
PG_HOST : Server on which postgres runs
PG_PORT : Port on which postgres runs
HOST : Application server
PORT : Application port
```

## Start the app
```
node app.js
```