DROP DATABASE IF EXISTS tracker_db;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE DATABASE tracker_db;
USE tracker_db;


CREATE TABLE department (
    id INTEGER NOT NULL auto_increment PRIMARY KEY,
    department VARCHAR(30)
);

CREATE TABLE role (
    title VARCHAR(30),
    salary DECIMAL PRIMARY KEY,
    role_id INTEGER,
    department VARCHAR(30)
);

CREATE TABLE employee (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  title VARCHAR(30),
  department VARCHAR(30), 
  salary DECIMAL,
  manager VARCHAR(30)
);

