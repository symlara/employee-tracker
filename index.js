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


