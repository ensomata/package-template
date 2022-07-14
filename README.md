# Ensomata Package Template

#### This is a Template Repository

A template repository allows you to start a new github project with all of the boilerplate already laid out. [Check here for more info about using a template repository.](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

## NPM Commands

```
# Transpiles the typescript and generates the JSONSchema
npm run build

# Runs the tests with Jest
npm run test

# Runs the tests with Jest, watching for changes
npm run test:watch

# Generates the developer documentation
npm run build:docs

```

The build and document generation process happens automatically during the build process managed by GitHub actions.

---

## NPM Package `@ensomata/`

The Typescript code in this package is exposed as an NPM package, `@ensomata/package-template`. If you need to use the code in other codebases, you can install that package from the GitHub Packages registry.

### Authenticating with Github Packages Registry

#### Obtain a personal access token

1. Navigate to the [github developer settings page](https://github.com/settings/tokens)
2. Create a new token with `repo` and `write:packages` permissions
3. Copy the token to a safe place
4. Export an environment variable `GH_NPM_TOKEN` in your `.zshrc` or `.bashrc` with the personal access token as the value

#### Authenticate via command line

Run the command below, using the GitHub token as the password

```
npm login --scope=@ensomata --registry=https://npm.pkg.github.com
```

#### Authenticate via `.npmrc`

Inside a project that will be installing this package, create a file named `.npmrc` with the following content:

```
@ensomata:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_NPM_TOKEN}
```

#### Authenticate within AWS Codebuild

1. Create personal access token (PAT) with `read:packages` permissions
2. Register token in AWS Secrets Manager
3. Authenticate to GitHub Packages using the PAT
4. Export the PAT in the CodeBuild environment variables (e.g. $GH_PERSONAL_ACCESS_TOKEN)

```
npm config set @ensomata:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken $GH_PERSONAL_ACCESS_TOKEN
```

---

## Husky Git Hooks

https://typicode.github.io/husky/#/

Husky allows you to configure hooks that run in the git lifecycle. The following hooks are configured:

- `pre-commit` - Runs [lint-staged](https://github.com/okonet/lint-staged)
  - Command to ensure consistent code formatting
- `prepare-commit-msg` - Runs [Commitizen](https://github.com/commitizen/cz-cli)
  - Command to assist in formatting standardized commit messages
- `commit-msg` - Runs [commitlint](https://github.com/conventional-changelog/commitlint)
  - Command to enforce standardized commit messages

---

## GitHub Actions

This repository is configured with GitHub actions to handle automated tasks related to publishing the NPM package. With the tooling above (e.g. Husky/conventional-commits/commitizen) we have enabled automated versioning with Semver, based on the commit messages included in any given push (or merge) to the `main` branch.

### Actions Workflow Summary

#### 1. Install and Test

- Check out latest commit on main branch
- Set up Nodejs execution environment (v 14)
- Install NPM dependencies
- Run automated tests

#### 2. Tag and Bump

- Check out latest commit on main branch
- Set up Nodejs execution environment (v 14)
- Bump package.json version and .cz.toml if necessary
- Create a new GitHub release
- Push to `prod` branch

#### 3. Publish Docs to Github Pages

- Check if there was a bump
- Check out latest commit on main branch
- Save the bumped version number in an environment variable
- Set up the Nodejs execution environment (v 14)
- Install NPM dependencies
- Run the `build:docs` script
- Commit the generated documentation

#### 4. Check For Version Bump

- Simply set a variable to allow future jobs to know if the version was actually bumped or not (e.g. if the latest change was simply a `ci:` or `docs:` commit message)

#### 5. Publish new Version on GitHub Package Repository

- Check out latest commit on main branch
- Install NPM dependencies
- Transpile and build code
- Prune development-only npm dependencies
- Set up the Nodejs execution environment (v 14)
  - Specify GitHub as the registry
- Publish the package

---
