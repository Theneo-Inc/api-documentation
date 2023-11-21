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
        uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - name: process documentation on server
        uses: Theneo-Inc/api-documentation@1.4.0
        with:
          FILE_PATH: doc/api.yml
          PROJECT_KEY: ${{secrets.PROJECT_KEY}}
          SECRET: ${{secrets.SECRET}}
          IMPORT_OPTION: overwrite
          SHOULD_PUBLISH: false
```

_make sure to update path with your document path, PROJECT_KEY with project key, SECRET with github secret_

## Inputs

- `FILE_PATH` (required): path to your documentation file within repository.
- `PROJECT_KEY` (required): unique identifier of project, it can be found under project settings for existing project.
- `SECRET` (required): Theneo API token to authenticate github request, displayed under user profile.
- `IMPORT_OPTION` (optional): import option should be one of (overwrite, merge, endpoints).
- `SHOULD_PUBLISH` (optional): Indicates if the documentation should be published automatically or not after importing.

### deprecated inputs
- `PATH` - instead use `FILE_PATH`

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/theneoAPIDoc/api-documentation. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

## License

The scripts and documentation in this project are released under the [MIT License](https://github.com/theneoAPIDoc/api-documentation/blob/main/LICENSE).
