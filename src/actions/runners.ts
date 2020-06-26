import debug from 'debug';
import { runCommand } from './common';
import { debugName } from '../constants';
import Data from '../data';

const {
  buildCheckOut,
  buildPull,
  buildNpmInstall,
  buildNewBranch,
  buildCheckoutBranch,
  buildUninstallPackage,
  buildInstallPackage,
  buildGitAddChanges,
  buildGitCommit,
  buildMergeBranch,
  buildRemoveBranch,
  buildPush,
  buildGetVersions,
} = require('./commands');

const debugLog = debug(debugName);

function runCheckoutOriginalBranch(data: Data): Promise<Data> {
  const checkoutCommand = buildCheckOut({ cwd: data.name, branch: data.defaultBranch });
  return runCommand(data, checkoutCommand, 'checkoutCommand');
}

function runPull(data: Data): Promise<Data> {
  const pullCommand = buildPull({ cwd: data.name });
  return runCommand(data, pullCommand, 'runPull');
}

function runNpmInstall(data: Data): Promise<Data> {
  const npmInstallCommand = buildNpmInstall({ cwd: data.name });
  return runCommand(data, npmInstallCommand, 'runNpmInstall');
}

function runCreateBranch(data: Data): Promise<Data> {
  const createBranchCommand = buildNewBranch({
    cwd: data.name,
    moduleName: data.moduleName,
    branchName: data.updateBranchName,
  });
  return runCommand(data, createBranchCommand, 'runCreateBranch');
}

function runCheckoutBranch(data: Data): Promise<Data> {
  const checkoutBranchCommand = buildCheckoutBranch({
    cwd: data.name,
    moduleName: data.moduleName,
    branchName: data.updateBranchName,
  });
  return runCommand(data, checkoutBranchCommand, 'runCheckoutBranch');
}

function runUninstallPackage(data: Data): Promise<Data> {
  const uninstallCommand = buildUninstallPackage({ cwd: data.name, moduleName: data.moduleName });
  return runCommand(data, uninstallCommand, 'runUninstallPackage');
}

function runInstallPackage(data: Data): Promise<Data> {
  const installCommand = buildInstallPackage({
    cwd: data.name,
    moduleName: data.moduleName,
    moduleVersion: data.moduleVersion,
  });
  return runCommand(data, installCommand, 'runInstallPackage');
}

function runGitAddChanges(data: Data): Promise<Data> {
  const addGitChangesCommand = buildGitAddChanges({ cwd: data.name });
  return runCommand(data, addGitChangesCommand, 'runGitAddChanges');
}

function runGitCommit(data: Data): Promise<Data> {
  const commitMessage = data.message || `"fix(package): update ${data.moduleName} module"`;
  const gitCommitCommand = buildGitCommit({
    cwd: data.name,
    moduleName: data.moduleName,
    commitMessage,
  });
  return runCommand(data, gitCommitCommand, 'runGitCommit');
}

function runMergeBranch(data: Data): Promise<Data> {
  const mergeBranchCommand = buildMergeBranch({
    cwd: data.name,
    moduleName: data.moduleName,
    branchName: data.updateBranchName,
  });
  return runCommand(data, mergeBranchCommand, 'runMergeBranch');
}

function runRemoveBranch(data: Data): Promise<Data> {
  const removeBranchCommand = buildRemoveBranch({
    cwd: data.name,
    moduleName: data.moduleName,
    branchName: data.updateBranchName,
  });
  return runCommand(data, removeBranchCommand, 'runRemoveBranch');
}

function runPush(data: Data): Promise<Data> {
  if (data.push) {
    const pushCommand = buildPush({ cwd: data.name });
    return runCommand(data, pushCommand, 'runPush');
  }

  debugLog(`SKIP "runPush" ${data.name}`);
  return Promise.resolve(data);
}

function runGetModuleVersions(data: Data): Promise<Data> {
  const getVersionsCommand = buildGetVersions({
    cwd: data.name,
    moduleName: data.moduleName,
  });

  return runCommand(data, getVersionsCommand, 'runGetModuleVersions');
}

const actions = [
  runCheckoutOriginalBranch,
  runPull,
  runNpmInstall,
  runCreateBranch,
  runCheckoutBranch,
  runUninstallPackage,
  runInstallPackage,
  runGitAddChanges,
  runGitCommit,
  runCheckoutOriginalBranch,
  runMergeBranch,
  runRemoveBranch,
  runPush,
];

const actionNames = [
  'checkout-orginal-branch',
  'pull-dev',
  'npm-install',
  'create-branch',
  'checkout-branch',
  'uninstall-package',
  'install-package',
  'git-add',
  'git-commit',
  'checkout-dev',
  'merge-branch',
  'remove-branch',
  'push-changes',
];

export {
  runCheckoutOriginalBranch,
  runPull,
  runNpmInstall,
  runCreateBranch,
  runCheckoutBranch,
  runUninstallPackage,
  runInstallPackage,
  runGitAddChanges,
  runGitCommit,
  runMergeBranch,
  runRemoveBranch,
  runPush,

  runGetModuleVersions,

  actions,
  actionNames,
};
