import { promises as fs } from 'fs';
import { expect } from "chai";
import hasModuleNameInPackage from './get-module-info-from-package';
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
      moduleVersion: '100.0.0',
    };


    it('should return true', async () => {
      console.time('test');
      const {hasModule, isDevDependency } = await hasModuleNameInPackage(data);
      expect(hasModule).to.eql(true);
      expect(isDevDependency).to.eql(false);
      console.timeEnd('test');
    });
  });

  describe('for a devDepedency in package.json', () => {
    const data = {
      ...baseData,
      moduleName: 'mocha',
      moduleVersion: '100.0.0'
    };

    it('should return true', async () => {
      console.time('test');
      const {hasModule, isDevDependency } = await hasModuleNameInPackage(data);
      expect(hasModule).to.eql(true);
      expect(isDevDependency).to.eql(true);
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
      const {hasModule} = await hasModuleNameInPackage(data);
      expect(hasModule).to.eql(false);
      console.timeEnd('test2');
    });
  })
});
