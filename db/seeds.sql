USE tracker_db;

INSERT into department (name) VALUES ('Sales');
INSERT into department (name) VALUES ('IT');
INSERT into department (name) VALUES ('Legal');
INSERT into department (name) VALUES ("HR");

INSERT into role (title, salary, role_id, name) VALUES ("Sales Lead", 90000, 1, "Sales");
INSERT into role  (title, salary, role_id, name) VALUES ("Salesperson", 50000, 1, "Sales");
INSERT into role (title, salary, role_id, name) VALUES ("Lead Engineer", 120000, 2, "IT");
INSERT into role (title, salary, role_id, name) VALUES ("Software Engineer", 100000, 2, "IT");
INSERT into role (title, salary, role_id, name) VALUES ("Accountant", 95000, 1, "Sales");
INSERT into role (title, salary, role_id, name) VALUES ("Legal Team Lead", 100000, 3, "Legal");
INSERT into role (title, salary, role_id, name) VALUES ("Lawyer", 190000, 3, "Legal");
INSERT into role (title, salary, role_id, name) VALUES ("Cyber Security", 160000, 2, "IT");
INSERT into role (title, salary, role_id, name) VALUES ("Full Stack Developer", 120000, 2, "IT");


INSERT into employee (first_name, last_name, manager_id, name, title, salary) VALUES ("Ronald", "Firbank", 1, "Sales", "Sales Lead", 90000);
INSERT into employee (first_name, last_name, manager_id, name, title, salary) VALUES ("Aaliyah", "Symlar", 2, "IT", "Lead Engineer", 120000);
INSERT into employee (first_name, last_name, manager_id, name, title, salary) VALUES ("Piers", "Gaveston", 3, "Legal", "Lawyer", 190000);

INSERT into employee (first_name, last_name, manager_id, name, title, salary) VALUES ("Brandon", "Speers", 1, "Sales", "Accountant", 95000);
INSERT into employee (first_name, last_name, manager_id, name, title, salary) VALUES ("King ", "T'Challa", 3, "Legal", "Legal Team Lead", 100000);
INSERT into employee (first_name, last_name, manager_id, name, title, salary) VALUES ("Thor", null, 2, "IT", "Software Engineer", 100000);
INSERT into employee (first_name, last_name, manager_id, name, title, salary) VALUES ("Virginia", "Woolf", 2, "IT", "Cyber Security", 160000);






