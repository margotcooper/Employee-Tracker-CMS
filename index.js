//include inquirer to generate prompts for users
//all of command line questions and makes queries to backend = inquirer
//can split query in a class in a separate js file (not necessary)
//STEPS: npm i, npm start, mysql -u root -p, login, source schema.sql, source seeds.sql, node server.js (or what file in this case, index or connection?)
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
        message: "What do you want?!?!?!?",
        type: "list",
        name: "choice",
        choices: ["See All Departments", "See All Roles", "Exit"],
      },
    ])
    .then(function (ansObj) {
      if (ansObj.choice == "See All Departments") {
        queryDepartments();
      } else if (ansObj.choice == "See All Roles") {
        queryRoles();
      } else {
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
