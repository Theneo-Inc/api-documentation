
function getProjectId(projects, projectKey, workspaceSlug) {
  const project = projects.find((project) => {
    if (project.key !== projectKey) {
      return false
    }
    if (!workspaceSlug) {
      return true
    }
    return project.company?.slug === workspaceSlug;
  });
  if (!project) {
    throw new Error(`Could not find projects using slug: ${projectKey}`)
  }
  return project.id;
}


function getVersionId(versions, versionSlug) {
  const version = versions.find((version) => version.slug  === versionSlug);
  if (!version) {
    throw new Error(`Could not find Project version using slug: ${versionSlug}`)
  }
  return version.id;
}


module.exports = {
  getProjectId,
  getVersionId
}
