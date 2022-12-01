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
      } else if (ansObj.choice == "Add a Department") {
        //use inquirer to ask questions to user, then add to database. Example - Module 9 Activity 19
        addDept();
      } else if (ansObj.choice == "Add a Role") {
        addRole();
      } else if (ansObj.choice == "Add an Employee") {
        addEmployee();
      } else if (ansObj.choice == "Update an Employee Role") {
        updateEmployeeRole();
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
      SELECT first_name, last_name, job_title
      FROM employees
      LEFT JOIN roles
      ON employee_role = roles.id`;

  db.query(sqlQuery, (err, data) => {
    if (err) throw err;
    console.log("\n");
    console.table(data);
    console.log("\n");
    startApp();
  });
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new department name?",
        name: "newDept",
      },
    ])
    .then(
      (response) => {
        const sql = `INSERT INTO departments (department_name) VALUES (?)`;
        db.query(sql, [response.newDept], (err, data) => {
          if (err) throw err;
          console.log("Added new department");
          console.log(data);
          startApp();
        });
      }
      //add to table like in activity 28, module 12
    );
  //get user info
  //then use sequel to insert into database Module 12 Activity 28 - server.js file lines 27-30
}

function loadDept() {
  return db.promise().query("SELECT * FROM departments");
}

async function addRole() {
  var [rows] = await loadDept();

  var structuredList = rows.map((index) => ({
    name: index.department_name,
    value: index.id,
  }));

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new role name?",
        name: "newRole",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salary",
      },
      {
        type: "list",
        message: "What department is this new role under?",
        name: "deptOver",
        //how do I add the existing departments as choices here for the new role?
        choices: structuredList,
      },
    ])
    .then((response) => {
      const sql = `INSERT INTO roles (job_title, salary, department_id) 
      VALUES (?, ?, ?)`;

      db.query(
        sql,
        [response.newRole, response.salary, response.deptOver],
        (err, data) => {
          if (err) throw err;
          console.log("added role");
          startApp();
        }
      );

      //how do I add the three values into the data table?
      // const params [body.job_title];
    });
}

function loadRoles() {
  return db.promise().query("SELECT * FROM roles");
}

function loadEmployees() {
  return db.promise().query("SELECT * FROM employees");
}

async function addEmployee() {
  var [rows] = await loadRoles();

  var existingRoles = rows.map((index) => ({
    name: index.job_title,
    value: index.id,
  }));
  console.log(rows);

  var [rows] = await loadEmployees();
  var existingEmployees = rows.map((index) => ({
    name: index.first_name + " " + index.last_name,
    value: index.id,
  }));
  console.log(rows);
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new employee's first name?",
        name: "newFirstName",
      },
      {
        type: "input",
        message: "What is the new employee's last name?",
        name: "newLastName",
      },
      {
        type: "list",
        message: "What role does the employee have?",
        name: "employeeRole",
        choices: existingRoles,
      },
      //need to add here the list of roles as options
      //show list of ids and employees, user gives id number.
      //console.table - view all employees
      {
        type: "list",
        message: "What is the id of the new employee's reporting manager?",
        name: "reportingMgr",
        choices: existingEmployees,
      },
    ])
    .then(
      (response) => {
        const sql = `INSERT INTO employees (first_name, last_name, employee_role, reporting_manager) 
    VALUES (?, ?, ?, ?)`;

        db.query(
          sql,
          [
            response.newFirstName,
            response.newLastName,
            response.employeeRole,
            response.reportingMgr,
          ],
          (err, data) => {
            if (err) throw err;
            console.log("added Employee");
            startApp();
          }
        );
      }

      //how do I add the three values into the data table?
      // const params [body.job_title];
    );
}
//need help with updating employee role

async function updateEmployeeRole() {
  var [rows] = await loadRoles();
  var existingRoles = rows.map((index) => ({
    name: index.job_title,
    value: index.id,
  }));

  var [rows] = await loadEmployees();
  var existingEmployees = rows.map((index) => ({
    name: `${index.first_name} ${index.last_name}`,
    value: index.id,
  }));
  inquirer
    .prompt([
      {
        type: "list",
        message: "Who is the employee in a new role?",
        name: "empName",
        choices: existingEmployees,
      },
      {
        type: "list",
        message: "What is the new role for the employee?",
        name: "newEmpDept",
        choices: existingRoles,
      },
    ])
    .then((response) => {
      const sql = `UPDATE employees SET employee_role = newEmpDept WHERE empName = first_name AND last_name`;
      db.query(sql, [response.changeEmpDept], (err, data) => {
        if (err) throw err;
        console.log("Changed employee's department.");
        console.log(data);
        startApp();
      });
    });
}
//       //add to table like in activity 28, module 12
//     );
//   //get user info
//   //then use sequel to insert into database Module 12 Activity 28 - server.js file lines 27-30
// }

//   `DELETE FROM employees WHERE id = ${}`
// don't need to delete, just need to update.

//
//to run - node index.js
