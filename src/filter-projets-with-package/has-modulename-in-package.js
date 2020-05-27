const fs = require('fs').promises;
const Promise = require('bluebird');

function hasModuleInPackage(content, data) {
  return !!(String(content).match(data.moduleName));
}

function hasNotSameModuleVersion(content, data) {
  const regx = `${data.moduleName}\\": \\"\\^?${data.moduleVersion}`;
  return !(String(content).match(regx));
}

function hasModuleNameInPackage(data) {
  return Promise.resolve(fs.readFile(`${data.name}/package.json`))
    .then((fileContent) => hasModuleInPackage(fileContent, data)
      && hasNotSameModuleVersion(fileContent, data));
}

module.exports = hasModuleNameInPackage;
