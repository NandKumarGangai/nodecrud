const fs = require("fs");
const path = require("path");

const readFile = (fileName) => {
  try {
    return fs.readFileSync(path.resolve(__dirname, fileName)).toLocaleString();
  } catch (error) {
    throw error;
  }
};

const writeFile = (fileName, data) => {
  try {
    return fs.writeFileSync(path.resolve(__dirname, fileName), data);
  } catch (error) {
      console.error('error: ', error);
    throw error;
  }
};

module.exports = {
    readFile,
    writeFile
}