const Promise = require('bluebird');

const hasModuleNameInPackage = require('./has-modulename-in-package');

function filterProjectsWithPackage(data) {
  // change to find package with version
  return Promise.resolve(data)
    .map((_data) => Promise.props({
      ..._data,
      continue: hasModuleNameInPackage(_data),
    }))
    .filter((_data) => _data.continue);
}

module.exports = filterProjectsWithPackage;
