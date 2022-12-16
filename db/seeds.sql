INSERT INTO department (name)
VALUES  ("sales"),
        ("hr"),
        ("home");

INSERT INTO role (title, salary, department_id)
VALUES  ("scheff", 50000, 2),
        ("sales person", 31000, 1),
        ("hr", 31000, 2),
        ("senior hr", 35000, 2),
        ("janitor ", 25000, 3),
        ("receptionist", 31000, 1),
        ("CEO", 55000, 2),
        ("accounter", 31000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("name1", "second1", 7, NULL),
        ("name2", "second2", 1, 1),
        ("name3", "second3", 4, 1),
        ("name4", "second4", 3, 3),
        ("name5", "second5", 8, 1),
        ("name6", "second6", 6, 1),
        ("name7", "second7", 2, 2),
        ("name8", "second8", 2, 2),
        ("name9", "second9", 2, 2),
        ("name10", "second10", 5, 3);