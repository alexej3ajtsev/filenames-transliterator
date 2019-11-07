const minimist = require("minimist");
const chalk = require("chalk");
const args = minimist(process.argv.slice(2));

if (!"path" in args || !args.path) {
  const errMessage =
    "You must pass path argument: \n npm start -- --path=/path/to/folder \nOR\n node index.js --path=/path/to/folder";
  console.log(chalk.red.bold(errMessage));
  return;
}

const pathToFolder = args.path;
const slugify = require("transliteration").slugify;
const fs = require("fs");

fs.readdir(pathToFolder, (err, files) => {
  if (err) {
    console.log(chalk.red.bold(err.message));
    return;
  }

  files.forEach(file => {
    renameFile(`${pathToFolder}/${file}`, `${pathToFolder}/${slugify(file)}`);
  });
  console.log(chalk.green.bold("\nRename files completed! 🎉\n"));
});

function renameFile(pathFrom, pathTo) {
  try {
    fs.renameSync(pathFrom, pathTo);
  } catch (err) {
    console.log(chalk.red.bold("RENAME_ERROR: " + err.message + " \n"));
  }
}
