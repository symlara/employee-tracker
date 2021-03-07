const inquirer = require("inquirer");
const myDatabase = require("./database");
const cTable = require("console.table");

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
    let query = `SELECT * FROM employee WHERE manager_id IS NULL`;

    const rows = await db.query(query);
    // console.log("number of rows retruned " + rows.length);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);   
    }
    return employeeNames;
}

async function getRoles() {
    let query = `SELECT title from role`;
    const rows = await db.query(query);
    //console.log("number of rows returned: " + rows.length);

    let roles = [];
    for(const row of rows) {
        roles.push(row.title);
    }

    return roles;
}

async function getDepartmentNames() {
    let query = `SELECT name FROM department`;
    const rows = await db.query(query);
    // console.log("number of rows returned: " + rows.length);

    let departments = [];
    for(const row of rows) {
        departments.push(row.name);
    }

    return departments;
}

// department id
async function getDepartmentId(departmentName) {
    let query = `SELECT * FROM department WHERE department.name = ?`;
    let args = [departmentName];
    const rows = await db.query(query, args);
    return rows[0].id;
}


// rold id
async function getRoleId(roleName) {
    let query = `SELECT * FROM role WHERE role.title = ?`;
    let args = [roleName];
    const rows = await db.query(query, args);
    return rows[0].id;
}


// employee.id of manager
async function getEmployeeId(fullName) {
    let employee = getFirstAndLastName(fullName);

    let query = `SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?`;
    let args = [employee[0], employee[1]];
    const rows = await db.query(query, args);
    return rows[0].id;
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

async function viewAllEmployeesByDepartment() {
    console.log("");
    let query = `SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id)`;
    const rows = await db.query(query);
    console.table(rows);
}

function getFirstAndLastName (fullName) {
    let employee = fullName.split(" ");
    if (employee.length == 2) {
        return employee;
    }

    const last_name = employee[employee.length-1];
    let first_name = " ";
    for(let i = 0; i < employee.length-1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
}


// updating an employee?

// add an employee
async function addEmployee(employeeInfo) {
    let roleId = await getRoleId(employeeInfo.role);
    let managerId = await getEmployeeId(employeeInfo.manager);

    // Insert into employee table
    let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    let args = [employeeInfo.first_name, employeeInfo.last_name, roleId, managerId];
    const rows = await db.query(query, args);
    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
}


// removeEmployee 


// add a department
async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = `INSERT INTO department name VALUES (?)`;
    let args = [departmentName];
    const rows = await db.query(query, args);
    console.log(`Added department named ${departmentName}`);
}

// add a role
async function addRole(roleInfo) {
    const departmentId = await getDepartmentId(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
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
                "View all employees by department",
                "View all roles",
                //"Remove employee",
                // "Update employee role",
                "Add department",
                "Add employee",
                "Add role",
                "Exit"
            ]
        }
    ]);
};
// view employees info
async function getAddEmployeeInfo() {
    const manager = await getManagerNames();
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
            message: "What is the employee's role?",
            name: "role",
            choices: [
                // content from db
                ... roles
            ]
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            name: "manager",
            choices: [
                // content from db
                ... managers
            ]
        }
    ]);
};



// deleteEmployee?

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
            
        }
    ])
}









process.on("exit", async function(code) {
    await db.close();
    return console.log(`About to exit with code ${code}`);
});

main();
