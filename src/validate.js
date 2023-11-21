const {ImportOption} = require("@theneo/sdk");
const {checkDocumentationFile} = require("./file");


async function validateInputOptions(options) {
  if (!options.path) {
    throw new Error("Add API documentation FILE_PATH in workflow file");
  }
  if (!options.projectKey) {
    throw new Error("PROJECT_KEY is missing");
  }
  if (!options.secret) {
    throw new Error("Add SECRET - Theneo API token, you can get it from: https://app.theneo.io/account-settings/toolsandintegrations");
  }

  const importOptions = [ImportOption.OVERWRITE, ImportOption.MERGE, ImportOption.ENDPOINTS_ONLY];
  if (options.importOption && !importOptions.includes(options.importOption)) {
    throw new Error(`import option should be one of ${options.importOption}`);
  }

  await checkDocumentationFile(options.path);
}


module.exports = {
  validateInputOptions
}
