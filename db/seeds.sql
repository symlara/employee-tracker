USE tracker_db;

INSERT into department (department) VALUES ('Sales');
INSERT into department (department) VALUES ('IT');
INSERT into department (department) VALUES ('Legal');
INSERT into department (department) VALUES ("HR");

INSERT into role (title, salary, role_id, department) VALUES ("Sales Lead", 60000, 1, "Sales");
INSERT into role  (title, salary, role_id, department) VALUES ("Salesperson", 50000, 1, "Sales");
INSERT into role (title, salary, role_id, department) VALUES ("Lead Engineer", 120000, 2, "IT");
INSERT into role (title, salary, role_id, department) VALUES ("Software Engineer", 90000, 2, "IT");
INSERT into role (title, salary, role_id, department) VALUES ("Accountant", 95000, 1, "Sales");
INSERT into role (title, salary, role_id, department) VALUES ("Legal Team Lead", 100000, 3, "Legal");
INSERT into role (title, salary, role_id, department) VALUES ("Lawyer", 190000, 3, "Legal");
INSERT into role (title, salary, role_id, department) VALUES ("Cyber Security", 160000, 2, "IT");
INSERT into role (title, salary, role_id, department) VALUES ("Full Stack Developer", 130000, 2, "IT");


INSERT into employee (first_name, last_name, manager, department, title, salary) VALUES ("Ronald", "Firbank", "Bo", "Sales", "Sales Lead", 90000);
INSERT into employee (first_name, last_name, manager, department, title, salary) VALUES ("Aaliyah", "Symlar", "Silk", "IT", "Lead Engineer", 120000);
INSERT into employee (first_name, last_name, manager, department, title, salary) VALUES ("Piers", "Gaveston", "Bob", "Legal", "Lawyer", 190000);


INSERT into employee (first_name, last_name, manager, department, title, salary) VALUES ("Brandon", "Speers", "Ryan", "Sales", "Accountant", 95000);
INSERT into employee (first_name, last_name, manager, department, title, salary) VALUES ("King ", "T'Challa", "Charles", "Legal", "Legal Team Lead", 100000);
INSERT into employee (first_name, last_name, manager, department, title, salary) VALUES ("Thor", null, "Mike", "IT", "Software Engineer", 100000);
INSERT into employee (first_name, last_name, manager, department, title, salary) VALUES ("Virginia", "Woolf", "Kim", "IT", "Cyber Security", 160000);






