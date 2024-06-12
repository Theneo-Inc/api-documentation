# Generate Stripe-like API Documentation

<p align="center"><img src='./asset/logo.png' height='150' width='150' /></p>
<p align='center'><a href='https://theneo.io/'>Get Started Today</a></p>

## Table of contents

- [Usage](#usage)
- [Inputs](#inputs)
- [Contributing](#contributing)
- [Licence](#license)

## Usage

Start by creating a documentation on [Theneo](https://theneo.io). Then add following workflow file to your GitHub project `.github/workflows/Theneo.yml`. On every push request theneo documentation will be updated.

### Update documentation on pull request

Update api documentation on push.

```
name: Update documention
on:
  pull_request:
    branches:
      - main
jobs:
  update-doc:
    name: update theneo doc
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
      - name: Import documentation in Theneo
        uses: Theneo-Inc/api-documentation@1.8.0
        with:
          FILE_PATH: doc/api.yml
          PROJECT_KEY: <project_slug>
          SECRET: ${{secrets.SECRET}}
          IMPORT_OPTION: overwrite
          AUTO_PUBLISH: false
          INCLUDE_GITHUB_METADATA: true
```

_make sure to update path with your document path, PROJECT_KEY with project key, SECRET with GitHub secret_

## Inputs

- `FILE_PATH` (required): path to your documentation file within repository.
- `PROJECT_SLUG` (required): unique identifier of project, it can be found under project settings for existing project.
- `VERSION_SLUG` (optional): Project version slug to import documentation under a specific version, otherwise default version will be used.
- `WORKSPACE_SLUG` (optional): Project workspace slug to import documentation under specific workspace.
- `SECRET` (required): Theneo API token to authenticate GitHub request, displayed under user profile.
- `IMPORT_OPTION` (optional): import option should be one of (`overwrite`, `merge`, `endpoints`, `append`), by default `overwrite` will be used.
- `AUTO_PUBLISH` (optional): Indicates if the documentation should be published automatically or not after importing.
- `INCLUDE_GITHUB_METADATA` (optional): Indicates if the imported documentation should include GitHub metadata (such as GitHub actor) or not - only visible in Theneo's editor.
- `SECTION_DESCRIPTION_MERGE_STRATEGY` (optional): Merging strategy for section descriptions to keep old descriptions from theneo editor if needed, valid values are keep_new or keep_old.
- `PARAMETER_DESCRIPTION_MERGE_STRATEGY` (optional): Merging strategy for parameter descriptions to keep old descriptions from theneo editor if needed, valid values are keep_new or keep_old.

### deprecated inputs
- `PROJECT_KEY` - instead use `PROJECT_SLUG`
- `PATH` - instead use `FILE_PATH`

## Note
you can find your project/version/workspace slugs upon publishing the project:

`https://app.theneo.io/<workspace_slug>/<project_slug>/<version_slug>`


### Example using `merge` import option
```yaml
      - name: Import documentation in Theneo
        uses: Theneo-Inc/api-documentation@1.8.0
        with:
          FILE_PATH: doc/api.yml

          PROJECT_KEY: <project_slug>
          VERSION_SLUG: <version_slug>
          WORKSPACE_SLUG: <workspace_slug>

          SECRET: ${{secrets.SECRET}}

          AUTO_PUBLISH: true

          IMPORT_OPTION: merge
          PARAMETER_DESCRIPTION_MERGE_STRATEGY: keep_new
          SECTION_DESCRIPTION_MERGE_STRATEGY: keep_old

          INCLUDE_GITHUB_METADATA: true
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/theneoAPIDoc/api-documentation. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

## License

The scripts and documentation in this project are released under the [MIT License](https://github.com/theneoAPIDoc/api-documentation/blob/main/LICENSE).
