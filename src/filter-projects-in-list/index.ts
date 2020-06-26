import path from 'path';
import Promise from 'bluebird';
import Data from '../data';

function getName(completeName: string) {
  return path.parse(completeName).name;
}

function isProjectInList(list:[string?], folderName: string = '') {
  return !list.length || list.includes(getName(folderName));
}

export default function filterProjectsInList(allowedProjects: [string?] = []) {
  return (data: [Data]) : Promise<[Data]> => <Promise<[Data]>>Promise.resolve(data)
    .map((_data: Data) => Promise.props({
      ..._data,
      continue: isProjectInList(allowedProjects, _data.name),
    }))
    .filter((_data) => _data.continue);
}
