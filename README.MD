# project-module-updater
## Motivation
The project try to help update one module in several projects.

It will examine folders with "package.json" file and update the ones which have the module as a dependency.

# Features
Update one module in several projets under a diretory at once.
## Steps
* find projects to update
* checkout the destination branch ("dev" by default)
* pull changes
* make `npm install`
* create a new branch for changes (name `fix/update-MODULE_NAME`)
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
* Commit and merge commit message has a default value.
* No allow to pass version in the module and it will install the last one
* The dependency will by installed in "dependencies" group

# Usage
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
  -h, --help                   display help for command
```

Example to run:
```
> node index.js -b BRANCH --directory DIRECTORY PACKAGE_NAME
```

# ToDos
* Activate debug option to see commands output
* Allow to pass version in the module
* Allow select "dependencies" or "devDependency" (o be smart and install where it was)
* Make all test to ensure future development and refactors(code was driven by fail-success)
* Add a max time for commands to end
* Check if updated is needed
* Add custom branch name

