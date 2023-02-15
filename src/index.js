const {getInput, setFailed} = require("@actions/core");
const {readFileSync} = require("fs");
const {importCollections, publishDocumentation, getProjects} = require("./api");

const path = getInput("PATH");
const projectId = getInput("PROJECT_KEY");
const secret = getInput("SECRET");

function getProjectId(projects, projectKey) {
    const project = projects.find((project) => project.key === projectKey);
    if (!project) {
        throw new Error(`Could not find projects by key ${projectKey}`)
    }
    return project._id;
}

async function main(path, projectKey, secret) {
    try {
        if (!path) throw new Error("Add API documentation PATH in workflow file");
        if (!projectKey) throw new Error("Add PROJECT_KEY in github secret");
        if (!secret) throw new Error("Add SECRET - Theneo API token");

        const file = readFileSync(path);
        const content = file.toString();

        const headers = {
            github: secret,
            tags: ["GITHUB"]
        }
        const projects = await getProjects(headers);
        const projectId = getProjectId(projects, projectKey);
        const {ok} = await importCollections(projectId, headers, content);

        if (ok) {
            await publishDocumentation(projectId, headers)
        }
    } catch (err) {
        setFailed(err.message);
    }
}

main(path, projectId, secret);
