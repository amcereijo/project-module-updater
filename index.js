const { program } = require('commander');
const path = require('path');
const pjson = require('./package.json');
const main = require('./main');

const DEFAULT_BRANCH = 'dev';
const DEFAULT_PUSH = false;


function resolvePathDir(dir) {
  return path.resolve(dir);
}
function getDefaultDir() {
  return resolvePathDir(`${__dirname}/../`);
}
function processProjects(projects) {
  return projects.split(',');
}

function programAction(moduleName) {
  const {
    branch: defaultBranch, directory: parentDir, push, applications: projects, message,
  } = program;

  main({
    moduleName, defaultBranch, parentDir, push, projects, message,
  });
}

program
  .version(pjson.version)
  .option('-b --branch <branch>', 'branch where to add new commit with package update', DEFAULT_BRANCH)
  .option('-d, --directory <directory>', 'diectory to start find projects', resolvePathDir, getDefaultDir())
  .option('-p, --push', 'push the updated branch', DEFAULT_PUSH)
  .option('-a, --applications <projects>', 'list of projects to update', processProjects, [])
  .option('-m, --message <message>', 'commit message')
  .arguments('<moduleName> dependecy to update')
  .action(programAction);

program.parse(process.argv);
