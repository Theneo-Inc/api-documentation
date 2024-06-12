const {setFailed} = require("@actions/core");
const {getInputOptions} = require("./input.js");
const {main} = require("./main");


main(getInputOptions())
  .catch(setFailed);
