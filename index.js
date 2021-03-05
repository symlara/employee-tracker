const inquirer = require("inquirer");
const db = require("./db/database");
const cTable = require("console.table");

const db = new Database({
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

    let query = `SELECT if FROM employee WHERE employee.first_name=? AND employee.last_name=?`;
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











process.on("exit", async function(code) {
    await db.close();
    return console.log(`About to exit with code ${code}`);
});

main();
