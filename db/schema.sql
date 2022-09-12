-- clean up tables, establish foreign key relationships

DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT,
    FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    -- for the next 4 options, did not do 'NOT NULL' because they could be empty at first
    employee_title VARCHAR(30),
    employee_department VARCHAR(30),
    employee_salary INT,
    reporting_manager VARCHAR(60)
);