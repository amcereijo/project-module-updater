const fs = require('fs').promises;

function hasModuleNameInPackage(data) {
  return fs.readFile(`${data.name}/package.json`)
    .then((fileContent) => !!(String(fileContent).match(`"${data.moduleName}":`)));
}

module.exports = hasModuleNameInPackage;
