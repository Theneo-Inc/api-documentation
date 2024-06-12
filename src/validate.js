const {ImportOption, MergingStrategy} = require("@theneo/sdk");
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

  const importOptions = Object.values(ImportOption);
  if (options.importOption && !importOptions.includes(options.importOption)) {
    throw new Error(`import option should be one of ${options.importOption}`);
  }

  await checkDocumentationFile(options.path);

  validateMergingStrategy(options.parameterDescriptionMergeStrategy, "PARAMETER_DESCRIPTION_MERGE_STRATEGY")
  validateMergingStrategy(options.sectionDescriptionMergeStrategy, "SECTION_DESCRIPTION_MERGE_STRATEGY")

}

function validateMergingStrategy(strategy, parameterName) {
  if (strategy) {
    let mergingStrategies = [MergingStrategy.KEEP_NEW, MergingStrategy.KEEP_OLD];
    if (!mergingStrategies.includes(strategy)) {
      throw new Error(`Invalid merging strategy ${strategy} for ${parameterName}, should be one of this ${mergingStrategies}`);
    }
  }
}


module.exports = {
  validateInputOptions,
  validateMergingStrategy
}
