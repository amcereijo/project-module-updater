const fs = require('fs').promises;
const Promise = require('bluebird');

const isNodeProject = require('./is-node-project');

/**
 *
 * @param {Object} data {defaultBranch: String ,moduleName: String, push: boolean }
 *
 * @returns {Promise<[{
 *  parentDir:String,
 *  defaultBranch: String,
 *  moduleName: String,
 *  push: boolean,
 *  name: String,
 *  continue: boolean
 * }]>}
 */
function readNodeProjects(data) {
  return Promise.resolve(data)
    .then(() => fs.readdir(data.parentDir))
    .map((f) => Promise.props({
      ...data,
      name: `${data.parentDir}/${f}`,
      continue: isNodeProject(data.parentDir, f),
    }))
    .filter((_data) => _data.continue);
}

module.exports = readNodeProjects;
