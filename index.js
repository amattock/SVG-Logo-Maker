const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
// const generatePage = require("./dist/index.html");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generate = require("./src/generateHTML");
const employeesArr = [];

const mainMenu = async () => {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: ["Add a team", "Exit"],
    },
  ]);
  switch (answer.menu) {
    case "Add a team":
      return addManager();
    case "Exit":
      console.log("Bye!");
      break;
  }
};

const addManager = async () => {
  // destructure answers obj with keys
  const { name, id, email, officeNumber } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the team manager's name? (Required)",
      validate: validateName
    },
    {
      type: "input",
      name: "id",
      message: "What is the team manager's ID? (Required)",
      validate: validateId
    },
    {
      type: "input",
      name: "email",
      message: "What is the team manager's email? (Required)",
      validate: validateEmail
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the team manager's office number? (Required)",
      validate: (officeInput) => {
        if (officeInput) {
          return true;
        } else {
          console.log("Please enter the manager's office number!");
          return false;
        }
      },
    },
  ]);
  const manager = new Manager(name, id, email, officeNumber);
  employeesArr.push(manager);
  return addUser();
};

const addUser = async () => {
  const choices = await inquirer
    .prompt({
      type: "list",
      name: "role",
      message: "Which employee are you adding? (Required)",
      choices: ["Engineer", "Intern"],
    });
  switch (choices.role) {
    default:
    case "Engineer":
      return addEngineer();
    case "Intern":
      return addIntern();
  }
};

function validateName(name) {
  if (name) {
    return true;
  } else {
    console.log("\n Please enter name!");
    return false;
  }
}

function validateId(id) {
  if (id) {
    // destructure employee ids, return id, see if includes new id
    if (employeesArr.map(({id}) => id).includes(id)) {
      console.log("\n That ID already exists!");
      return false;
    }
    return true;
  } else {
    console.log("\n Please enter an ID!");
    return false;
  }
}

function validateEmail(email) {
  if (email) {
    // destructure employee ids, return id, see if includes new id
    if (employeesArr.map(({email}) => email).includes(email)) {
      console.log("\n That email already exists!");
      return false;
    }
    return true;
  } else {
    console.log("\n Please enter an email!");
    return false;
  }
}

const addEngineer = async () => {
  const { name, id, email, github, addAnother } = await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name? (Required)",
        validate: validateName
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's ID? (Required)",
        validate: validateId
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email? (Required)",
        validate: validateEmail
      },
      {
        type: "input",
        name: "github",
        message: "What's your engineer's GitHub username?",
        validate: (githubInput_1) => {
          if (githubInput_1) {
            return true;
          } else {
            console.log("Please enter the engineer's GitHub username!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "addAnother",
        message: "Do you want to add another employee?",
        default: "true",
      },
    ]);
  employeesArr.push(new Engineer(name, id, email, github));
  if (addAnother) {
    return addUser();
  }
  return employeesArr;
};

const addIntern = async () => {
  const { name, id, email, school, addAnother } = await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the intern's name? (Required)",
        validate: validateName
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's ID? (Required)",
        validate: validateId
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email? (Required)",
        validate: validateEmail
      },
      {
        type: "input",
        name: "school",
        message: "What's your intern's school?",
        validate: (schoolInput_1) => {
          if (schoolInput_1) {
            return true;
          } else {
            console.log("Please enter the intern's school!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "addAnother",
        message: "Do you want to add another employee?",
        default: "true",
      },
    ]);
  employeesArr.push(new Intern(name, id, email, school));
  if (addAnother) {
    return addUser();
  }
  return employeesArr;
};

const writeToFile = (data) => {
  // console.log(data);
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/index.html", data, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: "HTML page created!",
      });
    });
  });
};

function init() {
  mainMenu()
    .then((response) => {
      // console.log(response);
      // console.log(employeesArr);
      return generate.generatePage(response);
    })
    .then((res) => {
      writeToFile(res);
      console.log("Success! Check out your generated HTML page!");
    });
}

init();




// encapsulate fx into separate fx
// call general questions, switch based on role
// call role specific quetions
// create employee, save to array
// ask question, do i want to create another employee
// if so, start over again. if not, writeFile
// take array of employees, generate card for each
// take array of HTML cards, join and write to file

// loop through array, take name, id, email, generate in cards
// based on role, generate office number, github
// ICONS based on role
// write new index.html