import Promise from 'bluebird';
import debug from 'debug';
import kleur from 'kleur';

import { debugName } from '../constants';
import Data, { DataResult } from '../data';

import {
  actionNames,
  actions,
} from '../actions/runners';
import errorsHandlerBuilder from '../errors-handler';
import filterProjectsWithPackage from '../filter-projets-with-package';
import filterProjectInListBuilder from '../filter-projects-in-list';
import findNodeProjects from '../find-node-projects';
import {
  printStart,
  printEnd,
  printProjectsToUpdate,
  bypassFunction,
} from '../utils';
import defineVersionToUpdate from '../define-version-to-update';
import filterByUserChoice from '../filter-by-user-choice';

const debugLog = debug(debugName);

const {
  removeErrors,
  getErrors,
} = errorsHandlerBuilder();

let interval: NodeJS.Timer;

function runActions(data: [Data], pos = 0): Promise<[Data]> {
  const action = actions.shift();
  let actualPos = pos;

  return <Promise<[Data]>>Promise.resolve(data)
    .map(action)
    .then(removeErrors(actionNames[actualPos]))
    .then((newData) => {
      actualPos += 1;

      if (actions.length) {
        return runActions(newData, actualPos);
      }

      return newData;
    });
}

function startInterval() : void {
  process.stdout.write(kleur.green('Running process: '));
  interval = setInterval(() => process.stdout.write('*'), 1000);
}
function stopInterval() {
  clearInterval(interval);
}

function maybeRunFilterByUserChoice(selectAll: boolean) {
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
function main(data: Data): void {
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

    .then((_data) => <DataResult>({ errors: getErrors(), success: _data }))
    .tap(printEnd);
}

export default main;
