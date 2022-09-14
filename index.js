//include inquirer to generate prompts for users
//all of command line questions and makes queries to backend = inquirer
//can split query in a class in a separate js file (not necessary)
//STEPS: npm i, npm start, mysql -u root -p, login, source schema.sql, source seeds.sql, node index.js
// var numchecked = 0
// function num () {
//     numchecked++
//     if(numchecked<3){
//         num()
//     }
// }

//-from andres, add more options for inquirer for entirety of app, add more functions for each option.

const inquirer = require("inquirer");
const db = require("./db/connection");

db.connect(function (err) {
  if (err) throw err;

  startApp();
});

function startApp() {
  inquirer
    .prompt([
      {
        message: "What would you like to do?",
        type: "list",
        name: "choice",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Exit",
        ],
      },
    ])
    .then(function (ansObj) {
      if (ansObj.choice == "View All Departments") {
        queryDepartments();
      } else if (ansObj.choice == "View All Roles") {
        queryRoles();
      } else if (ansObj.choice == "View All Employees") {
        queryEmployees();
      } else {
        //this 'else' catch-all will catch if they select exit
        process.exit(0);
      }
    });
}

function queryDepartments() {
  db.query("SELECT * FROM departments", (err, data) => {
    if (err) throw err;
    console.log("\n");
    console.table(data);
    console.log("\n");
    startApp();
  });
}

function queryRoles() {
  const sqlQuery = `
    SELECT job_title, salary, department_name
    FROM roles
    JOIN departments
    ON department_id = departments.id`;

  db.query(sqlQuery, (err, data) => {
    if (err) throw err;
    console.log("\n");
    console.table(data);
    console.log("\n");
    startApp();
  });
}

function queryEmployees() {
  const sqlQuery = `
      SELECT first_name, last_name, employee_role
      FROM employees
      JOIN roles
      ON employee_role = roles.id`;

  db.query(sqlQuery, (err, data) => {
    if (err) throw err;
    console.log("\n");
    console.table(data);
    console.log("\n");
    startApp();
  });
}
