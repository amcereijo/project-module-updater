import { promises as fs } from 'fs';
import { expect } from "chai";
import hasModuleNameInPackage from './has-modulename-in-package';
import path from 'path'

describe('define-version-to-update', () => {
  const name = path.resolve(`${__dirname}../../../`);
  const baseData = {
    moduleVersion: '0',
    defaultBranch: 'dev',
    parentDir: '.',
    push: false,
    projects: ['testing'],
    message: 'test',
    updateBranchName: 'dev',
    name,
    cwd: name,
  }

  describe('for a depedency in package.json', () => {
    const data = {
      ...baseData,
      moduleName: 'bluebird',
    };

    before(async () => {
      const fileContent = await fs.readFile(`${data.name}/package.json`);
      const json = JSON.parse(String(fileContent));
      const version = <string>json.dependencies[data.moduleName];
      data.moduleVersion = version.replace('^', '').replace('~', '').replace('*', '');
    });

    it('should return true', async () => {
      console.time('test');
      const hasModule = await hasModuleNameInPackage(data);
      expect(hasModule).to.eql(true);
      console.timeEnd('test');
    });
  });

  describe('for a depedency not in package.json', () => {
    const data = {
      ...baseData,
      moduleName: 'jest',
    };

    it('should return true', async () => {
      console.time('test2');
      const hasModule = await hasModuleNameInPackage(data);
      expect(hasModule).to.eql(false);
      console.timeEnd('test2');
    });
  })
});
