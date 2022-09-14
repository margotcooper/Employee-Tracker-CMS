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
    employee_role INT,
    FOREIGN KEY(employee_role) REFERENCES roles(id),
    employee_department VARCHAR(30),
    FOREIGN KEY(employee_department) REFERENCES departments(id),
    employee_salary INT,
    FOREIGN KEY(employee_salary) REFERENCES roles(salary),
    reporting_manager VARCHAR(60)
);