const packageJson = require('../package.json');
// const fs = require("fs");
// const packageJson = JSON.parse(fs.readFileSync(__dirname + "/../package.json", "utf8").toString());

const CLI_VERSION = packageJson.version;

module.exports = {
  CLI_VERSION
}
