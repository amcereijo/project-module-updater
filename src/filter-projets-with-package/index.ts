import Promise from 'bluebird';
import hasModuleNameInPackage from './has-modulename-in-package';
import Data from '../data';

<<<<<<< HEAD
<<<<<<< HEAD
export default function filterProjectsWithPackage(data: [Data]): Promise<[Data]> {
=======
export default function filterProjectsWithPackage(data: [Data]): Promise<[Data]>{
>>>>>>> Change to ts
=======
export default function filterProjectsWithPackage(data: [Data]): Promise<[Data]> {
>>>>>>> Linting
  return <Promise<[Data]>>Promise.resolve(data)
    .map((_data) => Promise.props({
      ..._data,
      continue: hasModuleNameInPackage(_data),
    }))
    .filter((_data) => Boolean(_data.continue));
}
