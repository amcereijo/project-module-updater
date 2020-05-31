const Promise = require('bluebird');
const debug = require('debug');
const kleur = require('kleur');
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
const {
  printStart,
  printEnd,
  printProjectsToUpdate,
  bypassFunction,
} = require('../utils');
const defineVersionToUpdate = require('../define-version-to-update');
const filterByUserChoice = require('../filter-by-user-choice');

const {
  removeErrors,
  getErrors,
} = errorsHandlerBuilder();

let interval;

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

function startInterval() {
  process.stdout.write(kleur.green('Running process: '));
  interval = setInterval(() => process.stdout.write('*'), 1000);
}
function stopInterval() {
  clearInterval(interval);
}

function maybeRunFilterByUserChoice(selectAll) {
  return selectAll ? bypassFunction : filterByUserChoice;
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
  console.log(kleur.green('Input data for process:'), data, '\n');
  debugLog('Running in debug mode...');

  const selectAll = !!data.projects.length;

  const filterProjectInList = filterProjectInListBuilder(data.projects);

  Promise.resolve(data)
    .then(defineVersionToUpdate)
    .tap(printStart)

    .then(findNodeProjects)

    .then(filterProjectsWithPackage)
    .then(filterProjectInList)
    .then(maybeRunFilterByUserChoice(selectAll))

    .tap(printProjectsToUpdate)

    .tap(startInterval)
    .then(runActions)
    .tap(stopInterval)

    .then((_data) => ({ errors: getErrors(), success: _data }))
    .tap(printEnd);
}

module.exports = main;
