const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const myEmployees = [];

// Write code to use inquirer to gather information about the development team members,

// and to create objects for each team member (using the correct classes as blueprints!)

const teamQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "number",
            name: "id",
            message: "What is your ID Number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
            default: () => {},
            validate: function (email) {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

                if (valid) {
                    return true;
                } else {
                    console.log(". Please enter a valid email");
                    return false;
                }
            },
        },
        {
            type: "number",
            name: "officeNumber",
            message: "What is your office number?",
        },
    
    ]);
};

const engineerQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "what is your Engineer's name?",
        },
        {
            type: "number",
            name: "id",
            message: "What is your Engineer's ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your Engineer's Email?",
            default: () => {},
            validate: function (email) {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

                if (valid) {
                    return true;
                } else {
                    console.log(". Please enter a valid email");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "github",
            message: "Please enter your Engineer's GitHub User Name:",
        },
        {
            type: "confirm",
            name: "addEngineer",
            message: "Would you like to add another Engineer?",
        },
    ]);
};

const internQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Intern's name?",
        },
        {
            type: "number",
            name: "id",
            message: "What is your Inter's ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your Interns email?",
            default: () => {},
            validate: function (email) {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

                if (valid) {
                    return true;
                } else {
                    console.log(". Please enter a valid email");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "school",
            message: "Please enter your Intern's school:",
        },
        {
            type: "confirm",
            name: "addIntern",
            message: "Would you like to add another Intern?",
        },
    ]);
};

teamQuestions().then((answers) => {
    const manager = new Manager(
        answers.name,
        1,
        answers.email,
        answers.officeNumber
    );
    myEmployees.push(manager);
    console.log("----- ENGINEERS -----");   

    engineerQuestions().then((answers) => {
        saveEngineer(answers);
    });
});

const saveEngineer = (answers) => {
    myEmployees.push(
        new Engineer(answers.name, answers.id, answers.email, answers.github)
    );
    if (answers.addEngineer) {
        engineerQuestions().then((answers) => {

            saveEngineer(answers);

        });
    } else {
        console.log("----- INTERNS -----");

        internQuestions().then((answers) => {
            saveIntern(answers);
        });
    }
};

const saveIntern = (answers) => {
    myEmployees.push(
        new Intern(answers.name, answers.id, answers.email, answers.school)
    );

    if (answers.addIntern) {
        internQuestions().then((answers) => {
            saveIntern(answers);
        });
    } else {
        fs.writeFile(outputPath, render(myEmployees), function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("Success! Your page has been created!");
        });
        return;
    }

};
