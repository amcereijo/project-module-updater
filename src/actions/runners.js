const debug = require('debug');
const { runCommand } = require('./common');
const { debugName } = require('../constants');

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
} = require('./commands');

const debugLog = debug(debugName);

function runCheckoutOriginalBranch(data) {
  const checkoutCommand = buildCheckOut({ cwd: data.name, branch: data.defaultBranch });
  return runCommand(data, checkoutCommand, 'checkoutCommand');
}

function runPull(data) {
  const pullCommand = buildPull({ cwd: data.name });
  return runCommand(data, pullCommand, 'runPull');
}

function runNpmInstall(data) {
  const npmInstallCommand = buildNpmInstall({ cwd: data.name });
  return runCommand(data, npmInstallCommand, 'runNpmInstall');
}

function runCreateBranch(data) {
  const createBranchCommand = buildNewBranch({
    cwd: data.name,
    moduleName: data.moduleName,
    branchName: data.updateBranchName,
  });
  return runCommand(data, createBranchCommand, 'runCreateBranch');
}

function runCheckoutBranch(data) {
  const checkoutBranchCommand = buildCheckoutBranch({
    cwd: data.name,
    moduleName: data.moduleName,
    branchName: data.updateBranchName,
  });
  return runCommand(data, checkoutBranchCommand, 'runCheckoutBranch');
}

function runUninstallPackage(data) {
  const uninstallCommand = buildUninstallPackage({ cwd: data.name, moduleName: data.moduleName });
  return runCommand(data, uninstallCommand, 'runUninstallPackage');
}

function runInstallPackage(data) {
  const installCommand = buildInstallPackage({ cwd: data.name, moduleName: data.moduleName });
  return runCommand(data, installCommand, 'runInstallPackage');
}

function runGitAddChanges(data) {
  const addGitChangesCommand = buildGitAddChanges({ cwd: data.name });
  return runCommand(data, addGitChangesCommand, 'runGitAddChanges');
}

function runGitCommit(data) {
  const commitMessage = data.message || `"fix(package): update ${data.moduleName} module"`;
  const gitCommitCommand = buildGitCommit({
    cwd: data.name,
    moduleName: data.moduleName,
    commitMessage,
  });
  return runCommand(data, gitCommitCommand, 'runGitCommit');
}

function runMergeBranch(data) {
  const mergeBranchCommand = buildMergeBranch({
    cwd: data.name,
    moduleName: data.moduleName,
    branchName: data.updateBranchName,
  });
  return runCommand(data, mergeBranchCommand, 'runMergeBranch');
}

function runRemoveBranch(data) {
  const removeBranchCommand = buildRemoveBranch({
    cwd: data.name,
    moduleName: data.moduleName,
    branchName: data.updateBranchName,
  });
  return runCommand(data, removeBranchCommand, 'runRemoveBranch');
}

function runPush(data) {
  if (data.push) {
    const pushCommand = buildPush({ cwd: data.name });
    return runCommand(data, pushCommand, 'runPush');
  }

  debugLog(`SKIP "runPush" ${data.name}`);
  return Promise.resolve(data);
}

module.exports = {
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

  actions: [
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
  ],

  actionNames: [
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
  ],
};
