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

function programAction(moduleName) {
  const {
    branch: defaultBranch, directory: parentDir, push,
  } = program;

  main({
    moduleName, defaultBranch, parentDir, push,
  });
}

program
  .version(pjson.version)
  .option('-b --branch <branch>', 'branch where to add new commit with package update', DEFAULT_BRANCH)
  .option('-d, --directory <directory>', 'diectory to start find projects', resolvePathDir, getDefaultDir())
  .option('-p, --push', 'push the updated branch', DEFAULT_PUSH)
  .arguments('<moduleName> dependecy to update')
  .action(programAction);

program.parse(process.argv);
