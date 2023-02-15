const axios = require("axios").default;
const config = require("./config");
const FormData = require("form-data");

async function getProjects(customHeaders) {
    const req = await axios.get(`${config.API_DOMAIN}/v2/project/github`, {headers: customHeaders})
    return req.data.data;
}

async function importCollections(projectId, customHeaders, content) {
    const bodyFormData = new FormData();
    bodyFormData.append("text", content);
    const response = await axios.post(
        `${config.API_DOMAIN}/v2/project/${projectId}/import/github`,
        bodyFormData,
        {
            headers: {
                ...customHeaders,
                ...bodyFormData.getHeaders(),
            },
        }
    );
    if (response.status === 200) {
        return {
            ok: true,
            collectionId: response.data.data
        }
    }
    return {
        ok: false,
        data: null
    }
}

async function publishDocumentation(projectId, customHeaders) {
    await axios.post(
        `${config.API_DOMAIN}/v2/publish/${projectId}/github`,
        new FormData(),
        {headers: customHeaders}
    );
}

module.exports = {getProjects, importCollections, publishDocumentation}
