const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');
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
                'View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Delete Employee', 'Exit'
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
                connection.end();
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
    const employeeNames = ['No Manager'];

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
           message: "What's the employee's first name?"
       },
       {
           type: 'input',
           name: 'lastName',
           message: "What's the employee's last name?"
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

       for (let i = 0; i < employeesData.length; i++) {
           if (answers.manager === employeesData[i].last_name) {
               managerId = employeesData[i].id;
           }else if (answers.manager === 'No Manager') {
               managerId = null;
           }
       }
       insertEmployee(answers.first_name, answers.last_name, roleId, managerId);
   });

}