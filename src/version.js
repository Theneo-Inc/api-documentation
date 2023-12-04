const packageJson = require('../package.json');
// const fs = require("fs");
// const packageJson = JSON.parse(fs.readFileSync(__dirname + "/../package.json", "utf8").toString());

const GITHUB_ACTION_VERSION = packageJson.version;

module.exports = {
  GITHUB_ACTION_VERSION
}
