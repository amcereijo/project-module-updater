const Promise = require('bluebird');
const debug = require('debug');
const { debugName } = require('../constants');

const debugLog = debug(debugName);

const {
  actionNames,
  actions,
} = require('../actions/runners');
const errorsHandlerBuilder = require('../errors-handler');
const filterProjectsWithPackage = require('../filter-projets-with-package');
const filterProjectInListBuilder = require('../filter-projects-in-list');
const findNodeProjects = require('../find-node-projects');
const { printEnd, printProjectsToUpdate } = require('../utils');
const defineVersionToUpdate = require('../define-version-to-update');

const {
  removeErrors,
  getErrors,
} = errorsHandlerBuilder();

async function runActions(data, pos = 0) {
  const action = actions.shift();
  let actualPos = pos;

  const newData = await Promise.resolve(data)
    .map(action)
    .then(removeErrors(actionNames[actualPos]));

  actualPos += 1;

  if (actions.length) {
    return runActions(newData, actualPos);
  }

  return newData;
}


/**
 *
 *
 * @param {Object} data {
 *  moduleName: String,
 *  moduleVersion: String
 *  defaultBranch: String,
 *  parentDir: String,
 *  push: Boolean,
 *  projects:[String],
 *  message: String
 *  updateBranchName: String
 * }
 */
function main(data) {
  console.log('Start process with:', data, '\n');
  debugLog('Running in debug mode...');

  const filterProjectInList = filterProjectInListBuilder(data.projects);

  Promise.resolve(data)
    .then(defineVersionToUpdate)
    .tap((_data) => console.log('Process completed with', _data, '\n'))

    .then(findNodeProjects)
    .then(filterProjectsWithPackage)
    .then(filterProjectInList)

    .tap(printProjectsToUpdate)

    .then(runActions)

    .then((_data) => ({ errors: getErrors(), success: _data }))
    .tap(printEnd);
}

module.exports = main;
