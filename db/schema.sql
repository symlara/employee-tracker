DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;
USE tracker_db;


CREATE TABLE department (
    id INTEGER NOT NULL auto_increment PRIMARY KEY,
    department VARCHAR(30)
);

CREATE TABLE role (
    id INTEGER NOT NULL auto_increment PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
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
  manager_id INTEGER,
  FOREIGN KEY (manager_id) REFERENCES role(id)
);

