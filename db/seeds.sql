USE tracker_db;

INSERT into department (name) VALUES ('Sales');
INSERT into department (name) VALUES ('IT');
INSERT into department (name) VALUES ('Tony');
INSERT into department (name) VALUES ("HR");

INSERT into role (title, salary, department_id) VALUES ("Sales Lead", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Salesperson", 50000, 1);
INSERT into role (title, salary, department_id) VALUES ("Lead Engineer", 100000, 2);
INSERT into role (title, salary, department_id) VALUES ("Software Engineer", 120000, 2);
INSERT into role (title, salary, department_id) VALUES ("Accountant", 125000, 3);
INSERT into role (title, salary, department_id) VALUES ("Legal Team Lead", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Lawyer", 190000, NULL);
INSERT into role (title, salary, department_id) VALUES ("Cyber Security", 160000, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Ronald", "Firbank", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Aaliyah", "Symlar", 2, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Piers", "Gaveston", 2, 1);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Brandon", "Speers", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("King ", "T'Challa", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Thor", null, 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Virginia", "Woolf", 3, 2);





