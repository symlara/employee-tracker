const inquirer = require("inquirer");
const myDatabase = require("./database");
const cTable = require("console.table");
const { restoreDefaultPrompts } = require("inquirer");

const db = new myDatabase({
    host: "localhost",
    port: 3306,
    //MySQL username
    user: 'root',
    //MySQL password
    password: 'Senior94',
    database: 'tracker_db'
});


// start calls to the database

async function getManagerNames() {
    let query = `SELECT ALL manager FROM employee`;
    
    const rows = await db.query(query);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.manager);
    }
    return employeeNames;
}

async function getRoles() {
    let query = `SELECT title from role`;
    const rows = await db.query(query);
   
    let roles = [];
    for(const row of rows) {
        roles.push(row.title);
    }

    return roles;
}

async function getDepartmentNames() {
    let query = `SELECT department FROM department`;
    const rows = await db.query(query);

    let departments = [];
    for(const row of rows) {
        departments.push(row.department);
    }

    return departments;
}

// department id
async function getDepartmentId(department) {
    let query = `SELECT * FROM department WHERE department = ?`;
    let args = [department];
    const rows = await db.query(query, args);
    return rows[0].id;
}


// rold id
async function getRoleId(roleName) {
    let query = `SELECT * FROM role WHERE role.title = ?`;
    let args = [roleName];
    const rows = await db.query(query, args);
    return rows[0];
}


// employee.id of manager
async function getEmployeeId(fullName) {
    let employee = getFirstAndLastName(fullName);

    let query = `SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?`;
    let args = [employee[0], employee[1]];
    const rows = await db.query(query, args);
    return rows[0];
}

async function getEmployeeNames() {
    let query = `SELECT * FROM employee`;

    const rows = await db.query(query);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }

    return employeeNames;
}

// view all of the rows in the table
async function viewAllRoles() {
    console.log("");
    // SELECT * FROM role;
    let query = `SELECT * FROM role`;
    const rows = await db.query(query);
    console.table(rows);
    return rows;
}


async function viewAllDepartments() {
    let query = `SELECT * FROM department`;
    const rows = await db.query(query);
    console.table(rows);
}


async function viewAllEmployees() {
    console.log("");

    let query = `SELECT * FROM employee`;
    const rows = await db.query(query);
    console.table(rows);
}



function getFirstAndLastName( fullName ) {
    let employee = fullName.split(" ");

 }


// update an employee
async function updateEmployeeRole(roleName) {
    console.log(roleName)
    let roleId = await getRoleId();
    let employee = roleName.employeeName.split(' ');

console.log(employee);
    let query = `UPDATE employee SET title=? WHERE first_name=? AND last_name=?`;
    let args = [roleName.role, employee[0], employee[1]];
   
    const rows = await db.query(query, args);
   // console.log(`Updated employee ${employeeInfo.first_name} ${employeeInfo.last_name} with role ${employeeInfo.role}`);
}

// add an employee
async function addEmployee(employeeInfo) {
    let roleId = await getRoleId(employeeInfo.role);
    let managerId = await getEmployeeId(employeeInfo.manager);

    // Insert into employee table
    let query = `INSERT INTO employee (first_name, last_name, title, manager) VALUES (?, ?, ?, ?)`;
    let args = [employeeInfo.first_name, employeeInfo.last_name, roleId, manager];
    const rows = await db.query(query, args);
    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
}


// removeEmployee
async function removeEmployee(employeeInfo) {
    const employeeName = getFirstAndLastName(employeeInfo.employeeName);
    let query = `DELETE FROM employee WHERE id= ?`;
    let args = [employeeName];
    const rows = await db.query(query, args);
    console.log(`Employee removed: ${employeeName}`);
}




// add a department
async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = `INSERT INTO department (department) VALUES (?)`;
    let args = [departmentName];
    const rows = await db.query(query, args);
    console.log(`Added department named ${departmentName}`);
}

// add a role
async function addRole(roleInfo) {
    const departmentId = await getDepartmentId(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = `INSERT INTO role (title, salary, role_id) VALUES (?, ?, ?)`;
    let args  = [title, salary, departmentId];
    const rows = await db.query(query, args);
    console.log(`Added role ${title}`);
}

// end of db calls




// prompts for app to run in Terminal

async function firstPrompt() {
    return inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: [
                "View all departments",
                "View all employees",
                "View all roles",
                 "Update employee role",
                "Add department",
                "Add employee",
                "Remove employee",
                "Add role",
                "Exit"
            ]
        }
    ]);
};
// view employees info
async function getAddEmployeeInfo() {
    const managers = await getManagerNames();
    console.log(managers);
    const roles = await getRoles();
    return inquirer 
    .prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: [
                // content from db
                ... roles
            ]
        },
        {
            type: "list",
            name: "managerName",
            message: "Who is the employee's manager?",
            choices: [
                ...managers
           
            ]
        }
    ]);
};


async function getRemoveEmployeeInfo() {
    const employees = await getEmployeeNames();
    return inquirer
    .prompt([
        {
            type: "list",
            message: "Which employee would you like to remove?",
            name: "employeeName",
            choices: [
                //content from db
                ... employees
            ]
        }
    ])
}



// view department info
async function getDepartmentInfo() {
    return inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of the new department",
            name: "departmentName"
        }
    ]);
}

async function getRoleInfo() {
    const departments = await getDepartmentNames();
    return inquirer
    .prompt([
        {
            type: "input",
            message: "What is the title of the new role?",
            name: "roleName"

        },
        {
            type: "input",
            message: "What is the salary of the new role?",
            name: "salary"
        },
        {
            type: "list",
            message: "Which department uses this role?",
            name: "departmentName",
            choices: [
                // content from db
                ... departments
            ]
        }
    ]);
}


async function getUpdateEmployeeRoleInfo() {
    const employees = await getEmployeeNames();
    const roles = await getRoles();
    return inquirer
    .prompt([
        {
            type: "list",
            message: "Which employee do you want to update?",
            name: "employeeName",
            choices: [
                // content from db
                ... employees
            ]
        },
        {
            type: "list",
            message: "What is the employee's new role?",
            name: "role",
            choices: [
                /// content from db
                ... roles
            ]
        }
    ])
    .then(answers => {
        console.log("answers: ", answers);
        return answers;
    })

}

async function main() {
    let exitLoop = false;
    while(!exitLoop) {
        const prompt = await firstPrompt();

        switch(prompt.action) {
            case 'Add department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break;
            }

            case 'Add employee': {
                const newEmployee = await getAddEmployeeInfo();
                console.log("add an employee");
                console.log(newEmployee);
                await addEmployee(newEmployee);
                break;
            }

            case 'Add role': {
                const newRole = await getRoleInfo();
                console.log("add a role");
                await addRole(newRole);
                break;
            }

            case 'Remove employee': {
                const employee = await getRemoveEmployeeInfo();
                await removeEmployee(employee);
                break;
            }


            case 'Update employee role': {
                const employee = await getUpdateEmployeeRoleInfo();
                console.log(employee);
                await updateEmployeeRole(employee);
                break;
            }

            case 'View all departments': {
                await viewAllDepartments();
                break;
            }

            case 'View all employees': {
                await viewAllEmployees();
                break;
            }


            case 'View all roles': {
                await viewAllRoles();
                break;
            }

            case 'Exit': {
                exitLoop = true;
                process.exit(0);
                return;
            }

            default:
                console.log(`Internal warning. Shouldn't get this action was ${prompt.action}`);

        };
    }
};




process.on("exit", async function(code) {
    await db.close();
    return console.log(`About to exit with code ${code}`);
});

main();
