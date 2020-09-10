# project-module-updater
## Motivation
The project is a CLI tool to help update one module in several projects.

# Features
Update one module in several projets under a diretory at once.

The tool allows:
  * indicate the initial branch for the project that will be updated.
  * indicate the folder in which perform search for projects to update.
  * indicate the list of project(folder names inside the folder to search).that should be updated. If not indicated, the user will be prompted to seleced the projects to update.
  * indicate the commit message for the commit updating the package.
  * indicate the name for the branch that will be created to perform the package update.
  * indicate if perform the push of the original branch when all changed are added (false by default).

Sem version for the module can be specified when pass the name for the pacakge to update. If not passed, the las version in npm registry will be used.

## Steps
* find projects to update(projects with the package include but in the same version)
* prompt user to select the projects to update (this step is skipped if the `-a` option is passed with the projects to update)
* checkout the destination branch ("dev" by default or passed with option `-b`)
* pull changes
* make `npm install`
* create a new branch for changes (name `fix/update-MODULE_NAME` or value passed with option `--update-branch-name`)
* checkout new branch
* uninstall package to ensure install the las version(major, minor or udpate)
* install package
* run `git add` (package.json and package-lock.json files)
* run `git commit`
* checkout destination branch
* merge branch with changes
* remove branch with changes
* push destination branch (desactivated by default)

# Limitations
* Only one module per execution can be update.
* The dependency will by installed in "dependencies" group

# Usage
## From npm
```
> npm i project-module-updater
```
To see command options
```
> project-module-updater --help
```
or
```
> pmu -h
```
Example to run:
```
> project-module-updater -b BRANCH --directory DIRECTORY <moduleName>
```
or
```
> pmu -b BRANCH --directory DIRECTORY <moduleName>
```

## From github repo
```
> git clone ....
> npm i
```

To see command options
```
> node index.js --help
```
Output:
```
Usage: index [options] <moduleName>

Options:
  -V, --version                output the version number
  -b, --branch <branch>        branch where to add new commit with package update (default: "dev")
  -d, --directory <directory>  directory to start find projects (default: "../current_directory")
  -p, --push                   push the updated branch (default: false)
  -a, --applications <package> list of projects to update (default: all projects in folder with the dependency)
  -m, --message                commit message (default: "fix(package): update MODULE_NAME module")
  --update-branch-name <updateBranchName>  name for the branch created to perform module update (default "fix/update-<moduleName>")
  -h, --help                   display help for command
```

Example to run:
```
> node index.js -b BRANCH --directory DIRECTORY <moduleName>
```
```
> node index.js -b BRANCH --directory DIRECTORY <moduleName@1.0.0>
```

## Expected process output
### Info about params to run command:
```
Input data for process: {
  moduleName: 'chai',
  moduleVersion: undefined,
  defaultBranch: 'master',
  parentDir: '/Users/User/folder/',
  push: false,
  projects: [],
  message: undefined,
  updateBranchName: undefined
}


Run process with: {
  moduleName: 'chai',
  moduleVersion: '4.2.0',
  defaultBranch: 'master',
  parentDir: '/Users/User/folder/',
  push: false,
  projects: [],
  message: undefined,
  updateBranchName: undefined
}
```
### Process result
It will show projects updated successfully and projects with errors
```
Process finished with:
Errors:
  checkout-orginal-branch: []
  pull-dev: []
  npm-install: []
  create-branch: []
  checkout-branch: []
  uninstall-package: []
  install-package: []
  git-add: []
  git-commit: []
  checkout-dev: []
  merge-branch: []
  remove-branch: []
  push-changes: []
Success: []
```

### Running in debug mode
To show all logs, use "pmu" as value for "DEBUG" env var. Example:
```
> DEBUG=pmu project-module-updater -b BRANCH --directory DIRECTORY <moduleName>
```

### Publishing workflow
Github actions are used to create and publish new versions.
#### How to plusih a new version
* Create a new branch for changes from "master" branch
* Make changes, commits and event pushing to remote
* To plublish a new version
  * pre-release version: just merge to "prerelease" branch
  * patch version:
    * merge to "patch" branch, it will generate a patch version but it will be not published to npm
    * merge from "patch" to "master", it will publish to npm the new version
  * minor version:
    * merge to "minor" branch, it will generate a minor version but it will be not published to npm
    * merge from "minor" to "master", it will publish to npm the new version
  * major version:
    * merge to "major" branch, it will generate a major version but it will be not published to npm
    * merge from "major" to "master", it will publish to npm the new version



# ToDos
* Make all test to ensure future development and refactors(code was driven by fail-success)
* Add a max time for commands to end

# Changelog
* *v 1.0.2*:
  * works fine as a CLI tool
* *v 1.1.0*:
  * --update-branch-name option
  * run wih `DEBUG=pmu` to see all logs
  * specify module version to update
* *v 1.2.0*:
  * check if updated is needed. Do no perform the update if the project already has the same module version in package.json
* *v 1.3.0*:
  * improve user messages
  * if not applications passed with `-a` option, the user will be prompted to select the projects to update
* *v 1.3.1*:
  * fix do not wait for client input if there is no project to select
* *v 1.4.0*:
  * add "pmu" as a command alias for "project-module-updater"
* *v 1.5.0*:
  * make create branch and checkout branch in one command
  * code rewritten in Typescript
  * use github actions and different branches to generate and publish new versions
* *v1.5.0*:
  * auto install module in "dependencies" or "devDependency"