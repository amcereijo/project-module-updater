import { program } from 'commander';
import path from 'path';
import pjson from './package.json';
import main from './src/main/index';
import Data from './src/data';


const DEFAULT_BRANCH = 'dev';
const DEFAULT_PUSH = false;


function resolvePathDir(dir:string) {
  return path.resolve(dir);
}
function getDefaultDir() {
  return resolvePathDir(`${__dirname}/../`);
}
function processProjects(projects:string) {
  return projects.split(',');
}

function splitModuleNameAndVersion(moduleName:string) {
  const [onlyModuleName, moduleVersion] = moduleName.split('@');

  return { onlyModuleName, moduleVersion };
}

function programAction(moduleName:string) {
  const {
    branch: defaultBranch,
    directory: parentDir,
    push,
    applications: projects,
    message,
    updateBranchName,
  } = program;

  const {
    onlyModuleName,
    moduleVersion,
  } = splitModuleNameAndVersion(moduleName);
  const data: Data = {
    moduleName: onlyModuleName,
    moduleVersion,
    defaultBranch,
    parentDir,
    push,
    projects,
    message,
    updateBranchName,
  };

  main(data);
}

program
  .version(pjson.version)
  .option('-b, --branch <branch>', 'branch where to add new commit with package update', DEFAULT_BRANCH)
  .option('-d, --directory <directory>', 'directory to start find projects', resolvePathDir, getDefaultDir())
  .option('-p, --push', 'push the updated branch', DEFAULT_PUSH)
  .option('-a, --applications <projects>', 'list of projects to update', processProjects, [])
  .option('-m, --message <message>', 'commit message')
  .option('--update-branch-name <updateBranchName>', 'name for the branch created to perform module update (default "fix/update-<moduleName>")')
  .arguments('<moduleName> dependecy to update')
  .action(programAction);

program.parse(process.argv);
