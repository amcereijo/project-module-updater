import Promise from 'bluebird';
import getModuleInfoFromPackage from './get-module-info-from-package';
import Data from '../data';

async function buildModuleInfo(data: Data) {
  const {
    hasModule,
    isDevDependency
  } = await getModuleInfoFromPackage(data);

  return { continue: hasModule, isDevDependency};
}

export default function filterProjectsWithPackage(data: [Data]): Promise<[Data]> {
  return <Promise<[Data]>>Promise.resolve(data)
    .map((_data) => Promise.props({
      ..._data,
      ...buildModuleInfo(_data),
    }))
    .filter((_data) => Boolean(_data.continue));
}