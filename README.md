# Ensomata Patient Entities

[![patient-entities](https://github.com/ensomata/patient-entities/actions/workflows/build-bump-tag-publish.yml/badge.svg?branch=main&event=push)](https://github.com/ensomata/patient-entities/actions/workflows/build-bump-tag-publish.yml)

This repo stores the TypeORM entities to be shared.

## NPM Commands

```
# Transpiles the typescript and generates the JSONSchema
npm run build

# Generates the developer documentation
npm run build:docs
```

The build and document generation process happens automatically during the build process managed by GitHub actions.

## Authenticating with Github Packages Registry

### Obtain a personal access token

1. Navigate to the [github developer settings page](https://github.com/settings/tokens)
2. Create a new token with `repo` and `write:packages` permissions
3. Copy the token to a safe place
4. Export an environment variable `GH_NPM_TOKEN` in your `.zshrc` or `.bashrc` with the personal access token as the value

### Authenticate via command line

Run the command below, using the GitHub token as the password

```
npm login --scope=@ensomata --registry=https://npm.pkg.github.com
```

### Authenticate via `.npmrc`

Inside a project that will be installing this package, create a file named `.npmrc` with the following content:

```
@ensomata:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_NPM_TOKEN}
```

## Husky Git Hooks

https://typicode.github.io/husky/#/

Husky allows you to configure hooks that run in the git lifecycle. The following hooks are configured:

- `pre-commit` - Runs [lint-staged](https://github.com/okonet/lint-staged)
  - Command to ensure consistent code formatting
- `prepare-commit-msg` - Runs [Commitizen](https://github.com/commitizen/cz-cli)
  - Command to assist in formatting standardized commit messages
- `commit-msg` - Runs [commitlint](https://github.com/conventional-changelog/commitlint)
  - Command to enforce standardized commit messages
