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
Example to run:
```
> project-module-updater -b BRANCH --directory DIRECTORY <moduleName>
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
  -d, --directory <directory>  diectory to start find projects (default: "../current_directory")
  -p, --push                   push the updated branch (default: false)
  -a, --applications <package> list of projects to update (default: all projects in folder with the dependency)
  -m, --message                commit message (default: "fix(package): update MODULE_NAME module")
  --update-branch-name <updateBranchName>  name for the branch created to perform module update (default "fix/update-<moduleName>")
  -h, --help                   display help for command
```

Example to run:
```
> node index.js -b BRANCH --directory DIRECTORY <moduleName>
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
Sucess: []
```

### Running in debug mode
To show all logs, use "pmu" as value for "DEBUG" env var. Example:
```
> DEBUG=pmu project-module-updater -b BRANCH --directory DIRECTORY <moduleName>
```

# ToDos
* Allow select "dependencies" or "devDependency" (o be smart and install where it was)
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
