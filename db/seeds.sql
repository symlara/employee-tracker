USE tracker_db;

INSERT INTO departments(name) VALUES
('Sales'),
('IT'),
('Legal'),
('HR');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 60000, 1),
        ('Salesperson', 50000, 1),
        ('Lead Engineer', 120000, 2),
        ('Accountant', 95000, 1),
        ('Assistant', 46000, 4),
        ('Lawyer', 100000, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES('Ronald', 'Firbank', 1, null),
('Aaliyah', 'Symlar', 2, 1),
('Anasia', 'Doe', 2, 1),
('Piers', 'Gaveston', 3, null),
('Atlas', 'Omni', 4, 4),
('Samra', 'Till', 4, 4),
('Scarlett', 'Johansson', 5, null);




