const {setFailed} = require("@actions/core");
const {Theneo} = require("@theneo/sdk");
const {CLI_VERSION} = require("./version.js");
const {validateInputOptions} = require("./validate.js");
const {getInputOption} = require("./input.js");


const path = getInputOption("FILE_PATH") || getInputOption("PATH");
const projectKey = getInputOption("PROJECT_KEY");
const secret = getInputOption("SECRET");
const importOption = getInputOption("IMPORT_OPTION");
const autoPublish = getInputOption("AUTO_PUBLISH") === "true";

function getProjectId(projects, projectKey) {
  const project = projects.find((project) => project.key === projectKey);
  if (!project) {
    throw new Error(`Could not find projects by key ${projectKey}`)
  }
  return project.id;
}


async function main(options) {
  await validateInputOptions(options);
  const {path, projectKey, secret, importOption, autoPublish} = options

  const theneo = new Theneo({
    apiKey: secret,
    apiClientName: `github-actions:${CLI_VERSION}`
  })

  const projectsResult = await theneo.listProjects();
  if (projectsResult.err) {
    setFailed(projectsResult.error.message);
    return;
  }
  const projectId = getProjectId(projectsResult.unwrap(), projectKey);

  const result = await theneo.importProjectDocument({
    projectId: projectId,
    publish: autoPublish,
    data: {
      file: path
    },
    importOption: importOption,
  });

  if (result.err) {
    setFailed(result.error.message);
    return;
  }
  if (result.value.publishData) {
    console.log(`API Documentation was published, you can see it here: ${result.value.publishData.publishedPageUrl}`)
  } else {
    console.log("API Documentation was updated successfully")
  }

}

main({path, projectKey, secret, importOption, autoPublish})
  .catch(setFailed);
