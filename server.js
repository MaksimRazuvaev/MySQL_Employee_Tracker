// To include nbm packages needed for create questionary (inquier) and save to file (fs) libraries
const inquirer = require('inquirer');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
const db = require("./db_connector/connection_db");

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);


//const generateData = require('./src/generateData');

// to launch the query after
const startMenu = () => {
    // start menu choice options
    const startMenuChoicesArr = ['view all departments', 
                                'view all roles', 
                                'view all employees', 
                                'add a department',               
                                'add a role', 
                                'add an employee', 
                                'update an employee role', 
                                'bonus menu',
                                'exit'];
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: startMenuChoicesArr,
        },     
    ])
    .then((answer) => {
        if (answer.options === 'view all departments') {
            viewAllDepartments();
        } else if (answer.options === 'view all roles') {
            viewAllRoles();
        } else if (answer.options === 'view all employees') {
            viewAllEmployees();
        } else if (answer.options === 'add a department') {
            addDepartment();
        } else if (answer.options === 'add a role') {
            addRole();
        } else if (answer.options === 'add an employee') {
            addEmployee();
        } else if (answer.options === 'update an employee role') {
            updateEmployee();
        } else if (answer.options === 'bonus menu') {
            startMenuBonus();
        }else {
            exitApp();
        }
    });
    // .catch((err) => console.log(err));
};

const startMenuBonus = () => {
    // bonus menu choice options
    const startMenuChoicesBonusArr = ["update employee managers", 
                                    "view employees by manager", 
                                    "view employees by department",
                                    "delete departments",
                                    "delete roles",
                                    "delete employees",
                                    "view the total utilized budget of a department",
                                    "Back to main menu"];
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Do you want to create new role or exit and form HTML page?',
            choices: startMenuChoicesBonusArr,
        },     
    ])
    .then((answer) => {
        if (answer.options === 'update employee managers') {
            updateEmployeeMahager();
        } else if (answer.options === 'view employees by manager') {
            viewEmployeeManager();
        } else if (answer.options === 'view employees by department') {
            viewEmployeeDepartment();
        } else if (answer.options === 'delete departments') {
            deleteDepartment();
        } else if (answer.options === 'delete roles') {
            deleteRoles();
        } else if (answer.options === 'delete employees') {
            deleteEmployee();
        } else if (answer.options === 'view the total utilized budget of a department') {
            viewBudget();
        }else{
            startMenu();
        }
    });
};

// view all roles query
const viewAllRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        startMenu();
    });
};

// view all departments query
const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        startMenu();
    });
};

// view all employees query
const viewAllEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        startMenu();
    });
};

// add departmen query
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
            maxLength: 30,
            validate: namelInput => {
                if (/[A-Za-z]{0, 30}/.test(namelInput)) {
                    return true;
                } else {
                    console.log("Please use letters to enter name. Use no more than 30 letters.");
                    return false;
                }
            }        
        },
    ])
    .then((answer) => {
        const queryStr = 'INSERT INTO department (name) VALUES ("'+ answer.name +'");';

        db.query(queryStr, function (err, results) {
            console.log(results);
        });
        startMenu();
    });
};

// add role query
const addRole = () => {
    db.query('SELECT * FROM department', function (err, results) {
        const departmentNames = [];
        results.forEach((result) => {
            departmentNames.push(result.name);
        });

        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the role?',
                maxLength: 30,
                validate: namelInput => {
                    if (/[A-Za-z]/.test(namelInput)) {
                        return true;
                    } else {
                        console.log("Please use letters to enter name");
                        return false;
                    }
                }        
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
                maxLength: 30,
                validate: salarylInput => {
                    // if (/[A-Za-z]{0, 30}/.test(namelInput)) {             ?????
                    if (/[0-9]/.test(salarylInput)) {
                        return true;
                    } else {
                        console.log("Please use digits to enter salary");
                        return false;
                    }
                }        
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: departmentNames,
            },
        ])
        .then((answer) => {
            const getDepartmentId = 'SELECT id FROM department WHERE name = "' + answer.department + '";';
            db.query(getDepartmentId, function (err, results) {
                const queryStr = 'INSERT INTO role (title, salary, department_id) VALUES ("'+ answer.name +'", '+ answer.salary +', '+ results[0].id +');';
                
                db.query(queryStr, function (err, results) {
                    console.table(results+ "did I get second request executed");
                });
                startMenu();
             });
        });
    });
};


// add employee query
const addEmployee = () => { 
    inquirer.prompt([
        {
            type: 'input',
            name: 'fName',
            message: "What is the employee's first name?",
            maxLength: 30,
            validate: fNamelInput => {
                // if (/[A-Za-z]{0, 30}/.test(namelInput)) {             ?????
                if (/[A-Za-z]/.test(fNamelInput)) {
                    return true;
                } else {
                    console.log("Please use letters to enter first name");
                    return false;
                }
            }        
        },
        {
            type: 'input',
            name: 'lName',
            message: "What is the employee's last name?",
            maxLength: 30,
            validate: lNamelInput => {
                // if (/[A-Za-z]{0, 30}/.test(namelInput)) {             ?????
                if (/[A-Za-z]/.test(lNamelInput)) {
                    return true;
                } else {
                    console.log("Please use letters to enter last name");
                    return false;
                }
            }        
        },
        {
            type: 'input',
            name: 'role',
            message: "What is the employee's role?",
            maxLength: 30,
            validate: roleInput => {
                // if (/[A-Za-z]{0, 30}/.test(namelInput)) {             ?????
                // display list of the roles from table ???
                if (/[A-Za-z]/.test(roleInput)) {
                    return true;
                } else {
                    console.log("Please use letters to enter role");
                    return false;
                }
            }        
        },
        {
            type: 'input',
            name: 'manager',
            message: "Who is the employee's manager?",
            maxLength: 30,
            validate: managerInput => {
                // if (/[A-Za-z]{0, 30}/.test(namelInput)) {             ?????
                // display list of the roles from table ???
                if (/[A-Za-z]/.test(managerInput)) {
                    return true;
                } else {
                    console.log("Please use letters to enter manager's name");
                    return false;
                }
            }        
        },
    ])
    .then((answer) => {
        // const queryStr = 'INSERT INTO department (name) VALUES ("queryName");';       ??????
        var managerName = answer.manager.split(" ");
        var mangerFName = managerName[0];
        var mangerLName = managerName[1];
        const getRoleId = 'SELECT id FROM role WHERE title = "' + answer.role + '"';

        db.query(getRoleId, function (err, results) {
            const roleId = results[0].id;
            const getManagerId = 'SELECT id FROM employee WHERE first_name = "' +mangerFName+ '" AND last_name = "' +mangerLName+ '"';
            db.query(getManagerId, function (err, results) {
                const managerId = results[0].id;
                const queryStr = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("' +answer.fName+ '", "' +answer.lName+ '", "' +roleId+ '", "' +managerId+ '");';
                db.query(queryStr, function (err, results) {
                    console.table(results);
                    startMenu();
                });
            });
        });
    });
};

// update employee role query
const updateEmployee = () => {
    // sql request to get list of employees with ids
    const employeeSQLRequest = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee';
    const employeeArray = [];

    // sql request to get list of roles with ids
    const roleRequest = 'SELECT id, title FROM role';
    const roleArray = [];

    //db request to get employees
    db.query(employeeSQLRequest, function (err, results) {
        results.forEach((result) => {
            employeeArray.push(result.name);
        });

        const employeeObj = results;

        //db request to get roles
        db.query(roleRequest, function (err, results) {
            results.forEach((result) => {
                roleArray.push(result.title);
            });
    
            const roleObj = results;

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: "Which employee's role do you want to update?",
                    choices: employeeArray,
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is new employee's role?",
                    choices: roleArray,
                },
            ])
            .then((answer) => {

                var employeeId = 0;
                
                // errow functions ???

                for(let i = 0; i < employeeObj.length; i++) {
                    if(employeeObj[i].name === answer.employee) {
                        employeeId = employeeObj[i].id;
                    }
                }

                var roleId = 0;
                for(let i = 0; i < roleObj.length; i++) {
                    if(roleObj[i].title === answer.role) {
                        roleId = roleObj[i].id;
                    }
                }

                const updateQueryStr = 'UPDATE employee SET role_id = ' +roleId+ ' WHERE id = '+employeeId+';';

                db.query(updateQueryStr, function (err, results) {
                    console.table(results);
                });
                startMenu();
            });
        });
    });
};

// view all roles query
const updateEmployeeMahager = () => {

};

const viewEmployeeManager = () => {

};

const viewEmployeeDepartment = () => {

};

const deleteDepartment = () => {

};

const deleteRoles = () => {

};

const deleteEmployee = () => {

};

const viewBudget = () => {

};

startMenu();

module.exports = startMenu;