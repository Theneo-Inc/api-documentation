const {lintFile} = require("yaml-lint");

async function checkDocumentationFile(path) {
  if (path.includes(".")) {
    const extension = path.split(".").pop();
    if (extension === "yaml" || extension === "yml") {
      await lintFile(path).catch((err) => {
        throw new Error(err);
      });
    }
    // TODO ADD checks for other type of files
  }
}


module.exports = {
  checkDocumentationFile
}
