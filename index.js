const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
// budget code?
const Department = require(__dirname + '/classes/Department.js');
const Role = require(__dirname + '/classes/Role.js');
const Employee = require(__dirname + '/classes/Employee.js');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password931',
    database: 'tracker_db'
});

// add employee tracker header here in GitHub

console.log('Welcome to the Employee Tracker');
connection.connect();
init();

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'init',
            message: 'What would you like to do?',
            choices: [
                'View all Departments', 'View all Roles', 'View Employees by Manager', 'View Employees by Department', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Delete Employee', 'Exit'
            ]
        }
    ]).then((answers) => {
        switch(answers.init) {
            case 'View all Departments':
                viewDepartments();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'View Employees by Manager':
                sortEmployees();
                break;
            case  'View Employees by Department':
                sortEmployees();
                break;
            case 'View all Employees':
                viewEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Exit':
                console.log('Goodbye');
                break;
        }
    })
}

// Functions

//add Departments
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?',
            default: () => {},
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }else {
                    console.log("A department's name is required.");
                    return false;
                }
            }
        }
    ]).then((answers) => {
        insertDepartment(answers.name);
    });
}

// insert Department
function insertDepartment(newDepart) {
    connection.query(`INSERT INTO departments SET ?`, new Department(newDepart), (err, res) => {
        if (err) throw err;
        console.log(`Added department ${newDepart} to Departments`);
        init();
    });
}

// add Roles
function addRole() {
    const array = [];
    getDepartmentsAsync()
    .then(data => {
        for (let i=0; i<data.length; i++) {
            array.push(data[i])
        }
    })
    .catch(err => {
        console.log(err);
    });

    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new role?',
            validate: nameInput => {
                if (nameInput && !isNaN(nameInput)) {
                    return true;
                }else {
                    console.log('Please be sure to only enter numbers.')
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department uses this role?',
            choices: array
        }
    ]).then(answers => {
        let departmentId;
        for (let i = 0; i < array.length; i++) {
            if (answers.department === array[i].name) {
                departmentId = array[i].id;
            }
        }
        insertRole(answers.title, answers.salary, departmentId);
    })
}

function insertRole(title, salary, department_id) {
    connection.query(`INSERT INTO roles SET ?`, new Role(title, salary, department_id), (err, res) => {
        if (err) throw err;
        console.log(`Added ${title} to Roles`);
        init();
    });
}


// add Employees
// get an array of objects:

function addEmployee() {
    const rolesData = [];
    const rolesNames = [];

    const employeesData = [];
    const employeesNames = [];
    

    getRolesAsync()
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            rolesData.push(data[i]);
            rolesNames.push(data[i].role)
        }

        getEmployeesAsync()
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                employeesData.push(data[i]);
                employeesNames.push(data[i].last_name)
            }
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    });

    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",

        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: rolesNames
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: employeesNames
        }
    ]).then(answers => {
        let roleId;
        let managerId;

        for (let i = 0; i < rolesData.length; i++) {
            if (answers.role === rolesData[i].role) {
                roleId = rolesData[i].id;
            }
        }

        insertEmployee(answers.firstName, answers.lastName, roleId, managerId);
    });
}

function insertEmployee(firstName, lastName, roleId, managerId) {
    connection.query(`INSERT INTO employees SET ?`, new Employee(firstName, lastName, roleId, managerId), (err, res) => {
        if (err) throw err;
        console.log(`Added ${firstName} ${lastName} to Employees`);
        init();
    });
}


// viewDepartments function to view list
function viewDepartments() {
    connection.query(`SELECT name, id FROM departments`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}


// viewRoles function to view list
function viewRoles() {
    connection.query(`SELECT roles.id, roles.title, departments.name AS departments, roles.salary
    FROM roles
   LEFT JOIN departments on roles.department_id = departments.id`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}


// viewEmployees function to sort through list of employees
function viewEmployees() {
    connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employees 
    LEFT JOIN roles on employees.role_id = roles.id 
    LEFT JOIN departments on roles.department_id = departments.id 
    LEFT JOIN employees manager on manager.id = employees.manager_id`, (err,res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};


function sortEmployees() {
    inquirer.prompt([
        {
            name: 'sortBy',
            type: 'list',
            message: 'How would you like to sort the employees?',
            choices: ['Manager', 'Department']
        }
    ]).then((answers) => {
        switch(answers.sortBy) {
            case 'Manager':
                sortByManager();
                break;
            case 'Department':
                sortByDepartment();
                break;
        }
    });
}


//sort employees by manager
function sortByManager() {
    connection.query(`SELECT e.last_name AS 'Employee Last Name', e.first_name AS 'Employee First Name', m.last_name AS 'Manager'
    FROM employees e
    LEFT JOIN employees m
    ON e.manager_id = m.id
    ORDER BY m.last_name, e.last_name`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

//sort employees by department
function sortByDepartment() {
    connection.query(`SELECT d.name AS 'Department', e.last_name AS 'Last Name', e.first_name AS 'First Name', r.title AS 'Role'
    FROM employees e
    JOIN roles r
    ON e.role_id = r.id
    LEFT JOIN departments d
    ON r.department_id = d.id
    ORDER BY d.name, e.last_name`,  (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}



// Update Employee Information
function updateEmployee() {
    const rolesData = [];
    const rolesNames = [];

    const employeesData = [];
    const employeesNames = [];

    getRolesAsync()
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            rolesData.push(data[i]);
            rolesNames.push(data[i].role)
        }

        getEmployeesAsync()
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                employeesData.push(data[i]);
                employeesNames.push(data[i].last_name)
            }
            updateEmployeeQuestions(rolesData, rolesNames, employeesData, employeesNames);
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    });
}


function updateEmployeeQuestions(rolesData, rolesNames, employeesData, employeesNames){
    inquirer.prompt([
        {
            type: 'list', 
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: employeesNames,
            pageSize: 12
        },
        {
            type: 'list',
            name: 'update',
            message: 'What information would you like to update?',
            choices: [`Employee's role`, `Employee's manager`, 'Cancel']
        }
    ]).then(answers => {
        let employeeId;
        for (let i = 0; i < employeesData.length; i++) {
            if (answers.employee === employeesData[i].last_name) {
                employeeId = employeesData[i].id;
            }
        }
        if (answers.update === `Employee's role`) {
            getNewRoleId(employeeId, rolesData, rolesNames)
        } else if (answers.update === `Employee's manager`) {
            employeesNames.push('No Manager');
            getManagerId(employeeId, employeesData, employeesNames)
        } else {
            init();
        }
    })
} 

function getNewRoleId(employeeId, rolesData, rolesNames){
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: `What is the employee's new role?`,
            choices: rolesNames
        }
    ]).then(answers => {
        let roleId;
        for (let i = 0; i < rolesData.length; i++) {
            if (answers.role === rolesData[i].role) {
                roleId = rolesData[i].id;
            }
        }
        updateEmployeeRole(employeeId, roleId)
    });
}

function updateEmployeeRole(employeeId, roleId) {
    connection.query(`UPDATE employees SET ? WHERE ?`, [
        {
            role_id: roleId
        },
        {
            id: employeeId
        }
    ],
    (err, res) => {
        if (err) throw err;
        console.log("You've changed employee's role");
        init();
    })
}

function getManagerId(employeeId, employeesData, employeesNames) {
    inquirer.prompt([
        {
            type: 'list', 
            name: 'manager',
            message: "Who is the employee's new manager?",
            choices: employeesNames
        }
    ]).then(answers => {
        let managerId;
        for (let i = 0; i < employeesData.length; i++) {
            if (answers.manager === employeesData[i].last_name) {
                managerId = employeesData[i].id;
            }
        }
        if (answers.manager === 'No Manager') {
            managerId = null;
        }
        updateEmployeeManager(employeeId, managerId)
    })
}

function updateEmployeeManager(employeeId, managerId) {
    connection.query(`UPDATE employees SET ? WHERE ?`, [
        {
            manager_id: managerId
        },
        {
            if: employeeId
        }
    ],
    (err, res) => {
        if (err) throw err;
        init();
    });
}

//delete employee
function deleteEmployee() {
    getEmployeesAsync()
    .then(data => {
        const employeesData = [];
        const employeesNames = [];
        for (let i = 0; i < data.length; i++) {
            employeesData.push(data[i]);
            employeesNames.push(data[i].last_name)
        }
        deleteEmployeeQuestions(employeesData, employeesNames)
    })
    .catch(err => {
        console.log(err);
    })
}

function deleteEmployeeQuestions(employeesData, employeesNames) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Which employee would you like to delete?',
            choices: employeesNames
        }
    ]).then(answers => {
        for (let i = 0; i < employeesData.length; i++) {
            if (answers.name === employeesData[i].last_name) {
                employeeId = employeesData[i].id;
            }
        }
        deleteEmployeeFromDb(employeeId, answers.name);
        init();
    });
}


function deleteEmployeeFromDb(employeeId, name) {
    connection.query(`DELETE FROM employees WHERE ?`, {id: employeeId}, (err, res) => {
        if (err) throw err;
        console.log(`Employee ${name} has been removed from tracker.`);
        init();
    });
}


// Async function calls


function getRolesAsync() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, title AS 'role' FROM roles ORDER BY role`, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}


function getEmployeesAsync() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, last_name FROM employees ORDER BY last_name`, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}



function getDepartmentsAsync() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM departments`, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        })
    })
}