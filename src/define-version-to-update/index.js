const Promise = require('bluebird');


const {
  runGetModuleVersions,
} = require('../actions/runners');

function defineVersionToUpdate(data) {
  if (!data.moduleVersion) {
    return Promise.resolve(runGetModuleVersions(data))
      .tap((_data) => {
        if (!_data.commandResult) {
          throw new Error(`No versions found for package "${data.moduleName}"`);
        }
      })
      .then((_data) => Promise.resolve({
        ...data,
        moduleVersion: _data.commandResult.slice(-1)[0],
      }));
  }

  return Promise.resolve(data);
}

module.exports = defineVersionToUpdate;
