// Inquirer and file system (node package manager) import
const inquirer = require("inquirer");
const fs = require("fs");
// Importing shapes from ./lib/shapes
const { Triangle, Square, Circle } = require("./lib/shapes");

function writeToFile(fileName, answers) {
  // svgString set as empty
  let svgString = "";
  // Creates file 300 x 200 as called out by acceptance criteria
  svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  // <g> tag wraps <text> in front of of polygon
  svgString += "<g>";
  // Inserts shape into polygon
  svgString += `${answers.shape}`;
  // shapeChoice will plot point of polygon, and insert answers from inquirer. 
  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<square x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }
  // Concat of text size and alignemnt, font color and letters. 
  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgString += "</g>";
  svgString += "</svg>";

  // returns consolelog message if file is written, or will return error 
  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("logo generated in examples folder");
  });
}

// question prompt utilizing inquirer
function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What shape would you like for your logo?",
        choices: [
          "Triangle",
          "Square",
          "Circle"
        ],
        name: "shape",
      },
      {
        type: "input",
        message:
          "What three letters would you like your logo to display?",
        name: "text",
      },
      {
        type: "input",
        message:
          "Choose a color for your text",
        name: "textColor",
      },
      {
        type: "input",
        message:
          "Choose a color for your shape",
        name: "shapeBackgroundColor",
      },
    ])
    .then((answers) => {
      // if stantment to address user input exceeding 3 characters 
      if (answers.text.length > 3) {
        console.log("Do not exceed 3 characters for logo selection");
        promptUser();
      } else {
        // Write file to examples folder
        writeToFile("./examples/logo.svg", answers);
      }
    });
}
promptUser();