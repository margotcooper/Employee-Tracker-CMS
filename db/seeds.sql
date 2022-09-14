-- seed info for employees whenever schema is done

USE employees_db;

INSERT INTO departments(department_name)
VALUES("R&D"),
("Sales"),
("Engineering");

INSERT INTO roles(job_title, salary, department_id)
VALUES("Salesperson", 90000, 2),
("Engineer", 80000, 3),
("DevOps", 70000, 1);

INSERT INTO employees(first_name, last_name, employee_role, employee_department, employee_salary, reporting_manager)
VALUES("Sally", "Smith", 2)
-- how do I insert all the foreign keys into the values part of line 16 (role, dept, salary)