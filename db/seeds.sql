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