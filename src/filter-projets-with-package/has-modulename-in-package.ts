import { promises as fs } from 'fs';
import Promise from 'bluebird';
import Data from '../data';

function hasModuleInPackage(content: Buffer, data: Data): boolean {
  return !!String(content).match(String(data.moduleName));
}

<<<<<<< HEAD:src/filter-projets-with-package/has-modulename-in-package.ts
function hasNotSameModuleVersion(content: Buffer, data: Data): boolean {
=======
function hasNotSameModuleVersion(content: Buffer, data: Data): boolean{
>>>>>>> Change to ts:src/filter-projets-with-package/has-modulename-in-package.ts
  const regx = `${data.moduleName}\\": \\"\\^?${data.moduleVersion}`;
  return !(String(content).match(regx));
}

function isNotTheModuleProject(content: Buffer, data: Data) {
  const regx = `"name": "${data.moduleName}`;
  return !(String(content).match(regx));
}

<<<<<<< HEAD:src/filter-projets-with-package/has-modulename-in-package.ts
export default function hasModuleNameInPackage(data: Data): Promise<boolean> {
=======
export default function hasModuleNameInPackage(data: Data): Promise<Boolean> {
>>>>>>> Change to ts:src/filter-projets-with-package/has-modulename-in-package.ts
  return Promise.resolve(fs.readFile(`${data.name}/package.json`))
    .then((fileContent) => hasModuleInPackage(fileContent, data)
      && isNotTheModuleProject(fileContent, data)
      && hasNotSameModuleVersion(fileContent, data));
}
