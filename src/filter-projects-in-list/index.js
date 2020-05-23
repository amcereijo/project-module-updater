const path = require('path');
const Promise = require('bluebird');

function getName(completeName) {
  return path.parse(completeName).name;
}

function isProjectInList(list, folderName) {
  return !list.length || list.includes(getName(folderName));
}

function filterProjectsInList(allowedProjects = []) {
  return (data) => Promise.resolve(data)
    .map((_data) => Promise.props({
      ..._data,
      continue: isProjectInList(allowedProjects, _data.name),
    }))
    .filter((_data) => _data.continue);
}


module.exports = filterProjectsInList;
