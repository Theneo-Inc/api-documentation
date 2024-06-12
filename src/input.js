const {getInput} = require("@actions/core");
const {validateMergingStrategy} = require("./validate");

function getInputOption(name) {
  if (!name) {
    throw new Error('name is required');
  }
  return getInput(name) || process.env[name];
}


function getInputOptions() {
  const path = getInputOption("FILE_PATH") || getInputOption("PATH");
  const projectKey = getInputOption("PROJECT_KEY") || getInputOption("PROJECT_SLUG");
  const versionSlug = getInputOption("VERSION_SLUG");
  const workspaceSlug = getInputOption("WORKSPACE_SLUG");
  const secret = getInputOption("SECRET");
  const importOption = getInputOption("IMPORT_OPTION");
  const autoPublish = getInputOption("AUTO_PUBLISH") === "true";
  const includeGithubMetadata = getInputOption("INCLUDE_GITHUB_METADATA") === "true";
  const parameterDescriptionMergeStrategy = getInputOption("PARAMETER_DESCRIPTION_MERGE_STRATEGY");
  const sectionDescriptionMergeStrategy = getInputOption("SECTION_DESCRIPTION_MERGE_STRATEGY");
  return {
    path,
    projectKey,
    versionSlug,
    workspaceSlug,
    secret,
    importOption,
    autoPublish,
    includeGithubMetadata,
    parameterDescriptionMergeStrategy,
    sectionDescriptionMergeStrategy
  };
}


module.exports = {
  getInputOptions
}
