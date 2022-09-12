// //connect to mysql backend
// //copy and paste another connection.js minus database name using.
// const express = require("express");
// const mysql = require("mysql2");

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Create connection to your local mysql database
// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     user: "root",
//     password: "September15!",
//     database: "employees_db",
//   },
//   console.log(`Connected to the employees_db database.`)
// );

// db.query("SELECT * FROM employees", function (err, results) {
//   console.log(results);
// });

// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "September15!",
  database: "employees_db",
});

module.exports = db;
