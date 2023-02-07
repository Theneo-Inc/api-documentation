const { getInput, setFailed } = require("@actions/core");
const { post } = require("axios").default;
const { lintFile } = require("yaml-lint");
const { readFileSync } = require("fs");

const path = getInput("PATH");
const projectKey = getInput("PROJECT_KEY");
const secret = getInput("SECRET");

const file = readFileSync(path);

async function testing() {
  try {
    if (!path) throw new Error("add doc path in workflow file");
    if (!projectKey) throw new Error("add PROJECT_KEY in github secret");
    if (!secret) throw new Error("add secret in github secret");

    await lintFile(path).catch((err) => {
      throw new Error(err);
    });

    const type = path.split(".")[1];
    const config = {
      headers: {
        github: secret,
      },
    };
    const { data } = await post(
      "https://api.theneo.io/github/update-doc",
      {
        key: projectKey,
        file,
        type,
      },
      config
    ).catch((err) => {
      throw new Error(err.response.data);
    });
    console.log(data);
  } catch (err) {
    setFailed(err.stack || String(err));
  }
}

testing();
