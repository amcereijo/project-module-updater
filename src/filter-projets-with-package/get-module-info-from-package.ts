import { promises as fs } from 'fs';
import Data from '../data';


function getCleanVersion(version: string): string {
  return version.replace('^', '').replace('~', '').replace('*', '');
}

export default async function hasModuleNameInPackage(data: Data): Promise<{hasModule: boolean, isDevDependency?: boolean}> {
  try {
    const fileContent = await fs.readFile(`${data.name}/package.json`);
    const jsonData = JSON.parse(String(fileContent));

    const version = jsonData.dependencies[data.moduleName]
      || jsonData.devDependencies[data.moduleName];

    const hasModule = !!(version &&
      getCleanVersion(String(version)) === data.moduleVersion);
    const isDevDependency = !!jsonData.devDependencies[data.moduleName];

    return {
      hasModule,
      isDevDependency
    };
  } catch (err) {
    return  {
      hasModule: false,
    };
  }
}