const Employee = require("../lib/Employee");

function generateCards(answers) {
  const role = answers.getRole();
  console.log(role);
  switch (role) {
    case "Manager":
      answers.wildcard = "Office Number: ";
      answers.wildcardInfo = answers.getOfficeNumber();
      answers.icon = "fas fa-mug-hot";
      break;
    case "Engineer":
      answers.wildcard = "GitHub: ";
      answers.wildcardInfo = answers.getGithub();
      answers.icon = "fas fa-glasses";
      break;
    case "Intern":
      answers.wildcard = "School: ";
      answers.wildcardInfo = answers.getSchool();
      answers.icon = "fas fa-user-graduate";
      break;
  }

  let output = `
    <div class="card col-4">
    <div class="card-body">
      <h3 class="card-title">${answers.name}</h3>
      <h5 class="card-text"><i class="${
        answers.icon
      } me-2"></i>${answers.getRole()}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${answers.id}</li>
      <li class="list-group-item">Email: <a href="mailto:${answers.email}">${answers.email}</a></li>
      <li class="list-group-item">${answers.wildcard}${
    answers.wildcardInfo
  }</li>
    </ul>
  </div>
`;
  return output;
}

function generatePage(employees) {
  let output = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
        <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <link rel="stylesheet" href="./style.css">
        <title>My Team</title>
    </head>
    <body>
        <header class="header"><h1>My Team</h1></header>
        <div class="row">`;
  for (i = 0; i < employees.length; i++) {
    output += generateCards(employees[i]);
  }
  output += `</div> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
    </body>
    </html>
`;
  return output;
}

module.exports = { generatePage: generatePage };
