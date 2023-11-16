const {getInput, setFailed} = require("@actions/core");
const {lintFile} = require("yaml-lint");
const {Theneo, ImportOption} = require("@theneo/sdk");

const path = getInput("PATH");
const projectId = getInput("PROJECT_KEY");
const secret = getInput("SECRET");

function getProjectId(projects, projectKey) {
    const project = projects.find((project) => project.key === projectKey);
    if (!project) {
        throw new Error(`Could not find projects by key ${projectKey}`)
    }
    return project.id;
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
        setFailed("PROJECT_KEY is missing");
        return;
    }
    if (!secret) {
        setFailed("Add SECRET - Theneo API token, you can get it from: https://app.theneo.io/account-settings/toolsandintegrations");
        return;
    }
    try {
        await checkDocumentationFile(path);

        const theneo = new Theneo({
            apiKey: secret,
            apiClientName: "Github Actions"
        })

        const projectsResult = await theneo.listProjects();
        if (projectsResult.err) {
            setFailed(projectsResult.error.message);
            return;
        }
        const projectId = getProjectId(projectsResult.unwrap(), projectKey);

        const result = await theneo.importProjectDocument({
            projectId: projectId,
            publish: true,
            data: {
                file: path
            },
            importOption: ImportOption.OVERWRITE,
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
    } catch (err) {
        setFailed(err.message);
    }
}

main(path, projectId, secret);
