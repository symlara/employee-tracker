USE tracker_db;

INSERT into department (department) VALUES ('Sales');
INSERT into department (department) VALUES ('IT');
INSERT into department (department) VALUES ('Legal');
INSERT into department (department) VALUES ("HR");

INSERT into role (title, salary, role_id, department) VALUES ("Sales Lead", 90000, 1, "Sales");
INSERT into role  (title, salary, role_id, department) VALUES ("Salesperson", 50000, 1, "Sales");
INSERT into role (title, salary, role_id, department) VALUES ("Lead Engineer", 120000, 2, "IT");
INSERT into role (title, salary, role_id, department) VALUES ("Software Engineer", 100000, 2, "IT");
INSERT into role (title, salary, role_id, department) VALUES ("Accountant", 95000, 1, "Sales");
INSERT into role (title, salary, role_id, department) VALUES ("Legal Team Lead", 100000, 3, "Legal");
INSERT into role (title, salary, role_id, department) VALUES ("Lawyer", 190000, 3, "Legal");
INSERT into role (title, salary, role_id, department) VALUES ("Cyber Security", 160000, 2, "IT");
INSERT into role (title, salary, role_id, department) VALUES ("Full Stack Developer", 120000, 2, "IT");


INSERT into employee (first_name, last_name, manager_id, department, title, salary) VALUES ("Ronald", "Firbank", 1, "Sales", "Sales Lead", 90000);
INSERT into employee (first_name, last_name, manager_id, department, title, salary) VALUES ("Aaliyah", "Symlar", 2, "IT", "Lead Engineer", 120000);
INSERT into employee (first_name, last_name, manager_id, department, title, salary) VALUES ("Piers", "Gaveston", 3, "Legal", "Lawyer", 190000);

INSERT into employee (first_name, last_name, manager_id, department, title, salary) VALUES ("Brandon", "Speers", 1, "Sales", "Accountant", 95000);
INSERT into employee (first_name, last_name, manager_id, department, title, salary) VALUES ("King ", "T'Challa", 3, "Legal", "Legal Team Lead", 100000);
INSERT into employee (first_name, last_name, manager_id, department, title, salary) VALUES ("Thor", null, 2, "IT", "Software Engineer", 100000);
INSERT into employee (first_name, last_name, manager_id, department, title, salary) VALUES ("Virginia", "Woolf", 2, "IT", "Cyber Security", 160000);






