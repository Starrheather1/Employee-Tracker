// TODO: Include packages needed for this application
const fs = require("fs")
var inquirer = require('inquirer');
const { printTable } = require('console-table-printer');

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Heatherstarr1234', database: 'Company'
});



// TODO: Create an array of questions for user input
const questions = [{
    type: "list", message: "what do you want to do?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
    name: "userAction"
}

];

// TODO: Create a function to write README file
function executeUserAction(action) {
    if (action === "add a department") {
        inquirer.prompt(
            [
                {
                    type: "input",
                    name: "departmentName",
                    message: "What is the name of the department?"
                }
            ]
        ).then(answers => {
            let name = answers.departmentName
            let query = "insert into department (name) values (?)"
            connection.query(query, [name], err => {

                if (err) {
                    console.log(err)
                } else {
                    console.log("department has been created")
                }
                init()
            });
        })
    } else if (action === "view all departments") {
        let query = "select * from department"
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err)

            } else {
                printTable(result)

            }
            init()
        })
    } else if (action === "add a role") {
        inquirer.prompt(
            [
                {
                    type: "input",
                    name: "roleTitle",
                    message: "What is the title of the role?"
                },
                {
                    type: "input",
                    name: "roleSalary",
                    message: "What is the salary?"
                },
                {
                    type: "input",
                    name: "roleDepartment",
                    message: "What is the id of the department?"
                }
            ]
        ).then(answers => {
            let title = answers.roleTitle
            let salary = answers.roleSalary
            let department = answers.roleDepartment
            let query = "insert into role (title,salary,department_id) values (?,?,?)"
            connection.query(query, [title,salary,department], err => {

                if (err) {
                    console.log(err)
                } else {
                    console.log("role has been created")
                }
                init()
            });
        })
    }else if (action === "view all roles") {
    let query = "select * from role"
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err)

        } else {
            printTable(result)

        }
        init()
    })

} else if (action === "add an employee") {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "employeeFirst",
                message: "What is first name of the employee?"
            },
            {
                type: "input",
                name: "employeeLast",
                message: "What is the last name of the employee?"
            },
            {
                type: "input",
                name: "employeeRole",
                message: "What is the role of the employee?"
            },
            {
                type: "input",
                name: "employeeManager",
                message: "Who is the employee manager?"
            }
        ]
    ).then(answers => {
        let first = answers.employeeFirst
        let last = answers.employeeLast
        let role = answers.employeeRole
        let manager = answers.employeeManager
        let query = "insert into employee (first,last,role,manager_id) values (?,?,?,?)"
        connection.query(query, [first,last,role,manager], err => {

            if (err) {
                console.log(err)
            } else {
                console.log("employee has been created")
            }
            init()
        });
    })
}else if (action === "view all employees") {
let query = "select * from employee"
connection.query(query, (err, result) => {
    if (err) {
        console.log(err)

    } else {
        printTable(result)

    }
    init()
})

    
}
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)

        .then((answers) => {
            executeUserAction(answers.userAction)
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}

// Function call to initialize app
init();

