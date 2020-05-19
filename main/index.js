const Promise = require('bluebird');

const {
  actionNames,
  actions,
} = require('../actions/runners');
const errorsHandlerBuilder = require('../errors-handler');
const filterProjectsWithPackage = require('../filter-projets-with-package');
const filterProjectInListBuilder = require('../filter-projects-in-list');
const findNodeProjects = require('../find-node-projects');
const { printEnd, printProjectsToUpdate } = require('../utils');

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
 * moduleName: String, defaultBranch: String, parentDir: String, push: Boolean, projects:[String]
 * }
 */
function main(data) {
  console.log('Start process with:', data);
  const filterProjectInList = filterProjectInListBuilder(data.projects);

  Promise.resolve(data)

    .then(findNodeProjects)
    .then(filterProjectsWithPackage)
    .then(filterProjectInList)

    .tap(printProjectsToUpdate)

    .then(runActions)

    .then((_data) => ({ errors: getErrors(), success: _data }))
    .tap(printEnd);
}

module.exports = main;
