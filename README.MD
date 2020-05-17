# project-module-updater
## Motivation
The project try to help update one module in several projects.

It will examine folders with "package.json" file and update the ones which have the module as a dependency.

# Features

# Limitations

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
  -b --branch <branch>         branch where to add new commit with package update (default: "dev")
  -d, --directory <directory>  diectory to start find projects (default: "../current_directory")
  -p, --push                   push the updated branch (default: false)
  -h, --help                   display help for command
```

Example to run:
```
> node index.js -b BRANCH --directory DIRECTORY PACKAGE_NAME
```

# ToDos
* Add custom commit message
* Add list of projects to update in directory
* Activate debug option to see commands output
* Make all test to ensure future development and refactors(code was driven by fail-success)