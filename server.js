// To include nbm packages needed for create questionary (inquier) and save to file (fs) libraries
const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./src/generateHTML');

const team = [];

// to launch the query after
const startMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Do you want to create new role or exit and form HTML page?',
            choices: ["view all departments", 
                        "view all roles", 
                        "view all employees",
                        "add a department",
                        "add a role",
                        "add an employee",
                        "update an employee role"],
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
        }
    });
};

// initial query to get an manager data
const viewAllRoles = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your manager name?',
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
            name: 'id',
            message: 'What is your manager id?',
            validate: idlInput => {
                if (/[0-9]/.test(idlInput)) {
                return true;
                } else {
                    console.log("Please use numbers for id");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your manager email address?',
            validate: emailInput => {
                if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(emailInput)) {
                    return true;
                } else {
                    console.log("Please enter email in the email@email.com format");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your manager office number?',
            validate: officeNumberlInput => {
                if (/[0-9]/.test(officeNumberlInput)) {
                return true;
                } else {
                    console.log("Please use numbers for officeNumber");
                    return false;
                }
            }
        },
    ])
        .then((answer) => {
            const manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
            team.push(manager);
            startMenu();
        });
};

// to launch Engineer query
const viewAllDepartments = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your engineer name?',
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
            name: 'id',
            message: 'What is your engineer id?',
            validate: idlInput => {
                if (/[0-9]/.test(idlInput)) {
                return true;
                } else {
                    console.log("Please use numbers for id");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your engineer email address?',
            validate: emailInput => {
                if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(emailInput)) {
                    return true;
                } else {
                    console.log("Please enter email in the email@email.com format");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your engineer GitHub username?',
        },
    ])
    .then((answer) => {
        const engineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
        team.push(engineer);
        startMenu();
    });
};

// to launch Intern query
const enterIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your intern name?',
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
            name: 'id',
            message: 'What is your intern id?',
            validate: idlInput => {
                if (/[0-9]/.test(idlInput)) {
                return true;
                } else {
                    console.log("Please use numbers for id");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your intern email address?',
            validate: emailInput => {
                if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(emailInput)) {
                    return true;
                } else {
                    console.log("Please enter email in the email@email.com format");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is your intern school?',
            validate: schoolInput => {
                if (/[A-Za-z]/.test(schoolInput)) {
                    return true;
                } else {
                    console.log("Please enter use letters to enter school");
                    return false;
                }
            }        
        },
    ])
    .then((answer) => {
        const intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        team.push(intern);
        startMenu();
    });
};


// TODO: Create a function to write HTML page
function writeToFile(fileName, data) {
    fs.appendFile(fileName, data, (err) =>
    err ? console.error(err) : console.log('Commit logged!'));
}

// function to initialize app
const init = () => {
    startMenu()
      .then(() => console.log('Successfully wrote to index.html'))
      .catch((err) => console.error(err));
  };
// Function call to initialize app
init();