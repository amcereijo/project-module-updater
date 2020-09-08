import { promises as fs } from 'fs';
import Data from '../data';


function getCleanVersion(version: string): string {
  return version.replace('^', '').replace('~', '').replace('*', '');
}

export default async function hasModuleNameInPackage(data: Data): Promise<boolean> {
  try {
    const fileContent = await fs.readFile(`${data.name}/package.json`);
    const jsonData = JSON.parse(String(fileContent));
    const version = jsonData.dependencies[data.moduleName];
    return !!(version &&
      getCleanVersion(String(version)) === data.moduleVersion);
  } catch (err) {
    return false;
  }
}