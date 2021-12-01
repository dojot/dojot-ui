const shell = require("shelljs");

const option = process.argv[2];

switch (option) {
  case "lint":
    shell.exec("eslint  ./src/ --fix --ext .js,.jsx");
    break;
  case "dev":
    shell.exec(`webpack-dev-server ./src/index.js --config ./webpack.dev.js --hot --progress`);
    break;
  case "build":
    shell.exec(`webpack --config webpack.prod.js --progress`);
    break;
  default:
    console.log("Invalid configuration. See README.md for available options.");
    return;
}
