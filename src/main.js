const {validateInputOptions} = require("./validate");
const {Theneo} = require("@theneo/sdk");
const {GITHUB_ACTION_VERSION} = require("./version");
const {setFailed} = require("@actions/core");
const {getVersionId, getProjectId} = require("./helpers");



async function main(options) {
  await validateInputOptions(options);
  const {
    path,
    projectKey,
    secret,
    importOption,
    autoPublish,
    includeGithubMetadata,
    versionSlug,
    workspaceSlug
  } = options

  const theneo = new Theneo({
    apiKey: secret,
    apiClientMetadata: {
      apiClientName: "github-action",
      apiClientVersion: GITHUB_ACTION_VERSION
    }
  })


  const projectsResult = await theneo.listProjects();
  if (projectsResult.err) {
    setFailed(projectsResult.error.message);
    return;
  }
  const projectId = getProjectId(projectsResult.unwrap(), projectKey, workspaceSlug);

  const importProjectData = {
    projectId: projectId,
    publish: autoPublish,
    data: {
      file: path
    },
    importOption: importOption,
  };

  if (includeGithubMetadata) {
    const authorName = process.env.GITHUB_ACTOR ?? process.env.GITHUB_TRIGGERING_ACTOR;
    importProjectData.importMetadata = {
      authorName: authorName,
    }
  }

  if (versionSlug) {
    const versionsResult = await theneo.listProjectVersions(projectId);
    if (versionsResult.err) {
      setFailed(versionsResult.error.message)
      return;
    }
    importProjectData.versionId = getVersionId(versionsResult.unwrap(), versionSlug)
  }

  const result = await theneo.importProjectDocument(importProjectData);

  if (result.err) {
    setFailed(result.error.message);
    return;
  }
  console.log(result.value)
  if (result.value.publishData) {
    console.log(`API Documentation was published, you can see it here: ${result.value.publishData.publishedPageUrl}`)
  } else {
    console.log("API Documentation was updated successfully")
  }
}

module.exports = {
  main
}
