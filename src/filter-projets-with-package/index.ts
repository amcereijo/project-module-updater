import Promise from 'bluebird';
import hasModuleNameInPackage from './has-modulename-in-package';
import Data from '../data';

export default function filterProjectsWithPackage(data: [Data]): Promise<[Data]> {
  return <Promise<[Data]>>Promise.resolve(data)
    .map((_data) => Promise.props({
      ..._data,
      continue: hasModuleNameInPackage(_data),
    }))
    .filter((_data) => Boolean(_data.continue));
}