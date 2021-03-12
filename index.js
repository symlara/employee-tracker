const inquirer = require("inquirer");
const myDatabase = require("./database");
const cTable = require("console.table");
// const { restoreDefaultPrompts } = require("inquirer");

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
    let query = `SELECT manager FROM employee`;
    const rows = await db.query(query);
    
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push({name: employee.manager, value: employee.manager});
    }
    return employeeNames;
}

async function getRoles() {
    let query = `SELECT title FROM role`;
    const rows = await db.query(query);
   
    let roles = [];
    for(const row of rows) {
        roles.push({name: row.title, value: row});
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
async function getDepartmentId(departmentId) {
    let query = `SELECT department.Id FROM department`;
    let args = [departmentId];
    const rows = await db.query(query, args);
    return rows[0];
}


// rold id
async function getRoleId(employeeInfo) {
    let title = getRoles();
    console.log(employeeInfo);
    let query = `SELECT title FROM role`;
    let args = title;
    const rows = await db.query(query, args);

    // console.log({
    //     "Array ": rows[0],
    //     // "Object ": rows.title, 
    // });

     console.log(rows[0]);
    return title;
}


// employee.id of manager
async function getEmployeeId(fullName) {
    let employee = getFirstAndLastName(fullName);

    let query = `SELECT id FROM employee`;
    let args = [employee];
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
    let employee = fullName.split(' ');

 }


// update an employee
async function updateEmployeeRole(roleName) {
    console.log(roleName)
    // let roleId = await getRoleId();
    let employee = roleName.employeeName.split(' ');

console.log(employee);
    let query = `UPDATE employee SET employee.title=? WHERE employee.title=?`;
    let args = [employee.title, employee[0], employee[1]];
   
    const rows = await db.query(query, args);
   // console.log(`Updated employee ${employeeInfo.first_name} ${employeeInfo.last_name} with role ${employeeInfo.role}`);
}


// add an employee
async function addEmployee(employeeInfo) {
    console.log(employeeInfo);
    let employee = getAddEmployeeInfo();
    let roleId = await getRoleId(employeeInfo.title);
    let manager = await getEmployeeId(employeeInfo.manager);
    // Insert into employee table
    let query = `INSERT INTO employee SET ?`;    
    let args = employeeInfo;
    const rows = await db.query(query, args);
    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
}

// removeEmployee
async function removeEmployee(employeeInfo) {
    const employeeName = getFirstAndLastName(employeeInfo.employeeName);
    let query = "DELETE FROM employee WHERE employee.first_name = ?";
    let args = [employeeName];
    const rows = await db.query(query, args);
    console.log(`Employee removed: ${employeeInfo.first_name} ${employeeInfo.last_name}`);
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
    console.log(roleInfo);
    const department = roleInfo.getDepartmentNames;
    const salary = roleInfo.salary;
    const title = employeeInfo.title;
    const role_id = roleInfo.role_id;
     let query = `INSERT INTO role (title, salary, role_id, department) VALUES (?, ?, ?, ?)`;
    let args  = [title, salary, role_id, department];
    const rows = await db.query(query, args);
    console.log(`Added role ${employeeInfo.title}`);
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
    const manager = await getManagerNames();
    console.log(manager);
    const title = await getRoles();
    const departments = await getDepartmentNames();
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
            name: "title",
            message: "What is the employee's role?",
            choices: [
                // content from db
                ... title
            ]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: [
                ...manager
           
            ]
        },
        {
            type: "list",
            name: "department",
            message: "What is this employee's department?",
            choices: [
                ... departments
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
    const title = await getRoles();
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
            name: "title",
            choices: [
                /// content from db
                ... title
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
                const roleName = await getUpdateEmployeeRoleInfo();
                console.log(roleName);
                await updateEmployeeRole(roleName);
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
