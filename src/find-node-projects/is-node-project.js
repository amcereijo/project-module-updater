const fs = require('fs').promises;

function isNodeProject(parentDir, folderName) {
  return fs.stat(`${parentDir}/${folderName}/package.json`)
    .then(() => true)
    .catch(() => false);
}

module.exports = isNodeProject;
