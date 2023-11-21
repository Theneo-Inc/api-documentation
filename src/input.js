const {getInput} = require("@actions/core");

function getInputOption(name) {
  if (!name) {
    throw new Error('name is required');
  }
  return getInput(name) || process.env[name];
}

module.exports = {
  getInputOption
}
