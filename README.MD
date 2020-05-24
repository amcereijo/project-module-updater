# project-module-updater
## Motivation
The project try to help update one module in several projects.

It will examine folders with "package.json" file and update the ones which have the module as a dependency.

Sem version for the module can be specified.

# Features
Update one module in several projets under a diretory at once.

## Steps
* find projects to update
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
> Start process with: {
  moduleName: 'my-package-to-update',
  defaultBranch: 'dev',
  parentDir: '/Users/amcereijo/Documents/git',
  push: false,
  projects: [],
  message: undefined
}
```
### Process result
It will show projects updated successfully and projects with errors
```
Process finished with:
 {
  "errors": {
    "checkout-orginal-branch": [],
    "pull-dev": [],
    "npm-install": [],
    "create-branch": [],
    "checkout-branch": [],
    "uninstall-package": [],
    "install-package": [],
    "git-add": [],
    "git-commit": [],
    "checkout-dev": [],
    "merge-branch": [],
    "remove-branch": [],
    "push-changes": []
  },
  "success": []
}
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
* Check if updated is needed

# Changelog
* *v 1.0.2*:
  * works fine as a CLI tool
* *v 1.1.0*:
  * --update-branch-name option
  * run wih `DEBUG=pmu` to see all logs
  * specify module version to update