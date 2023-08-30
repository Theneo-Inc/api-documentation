const {getInput, setFailed} = require("@actions/core");
const {readFileSync} = require("fs");
const {importCollections, publishDocumentation, getProjects} = require("./api");
const {lintFile} = require("yaml-lint");

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

async function main(path, projectKey, secret) {
    if (!path) {
        setFailed("Add API documentation PATH in workflow file");
        return;
    }
    if (!projectKey) {
        setFailed("Add PROJECT_KEY in github secret");
        return;
    }
    if (!secret) {
        setFailed("Add SECRET - Theneo API token");
        return;
    }
    try {
        await checkDocumentationFile(path);

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
        console.log("API Documentation was published")
    } catch (err) {
        setFailed(err.message);
    }
}

main(path, projectId, secret);
