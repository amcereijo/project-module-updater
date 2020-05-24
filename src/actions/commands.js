const { buildBranchName } = require('./common');

function buildCheckOut(opts = {}) {
  return {
    command: {
      program: 'git',
      args: ['checkout', opts.branch],
    },
    cwd: opts.cwd,
  };
}

function buildPull(opts = {}) {
  return {
    command: {
      program: 'git',
      args: ['pull'],
    },
    cwd: opts.cwd,
  };
}

function buildNpmInstall(opts = {}) {
  return {
    command: {
      program: 'npm',
      args: ['i'],
    },
    cwd: opts.cwd,
  };
}

function buildNewBranch(opts = {}) {
  return {
    command: {
      program: 'git',
      args: ['branch', buildBranchName(opts.moduleName, opts.branchName)],
    },
    cwd: opts.cwd,
  };
}

function buildCheckoutBranch(opts = {}) {
  return {
    command: {
      program: 'git',
      args: ['checkout', buildBranchName(opts.moduleName, opts.branchName)],
    },
    cwd: opts.cwd,
  };
}

function buildUninstallPackage(opts = {}) {
  return {
    command: {
      program: 'npm',
      args: ['uninstall', opts.moduleName],
    },
    cwd: opts.cwd,
  };
}

function buildInstallPackage(opts = {}) {
  const moduleName = opts.moduleVersion
    ? `${opts.moduleName}@${opts.moduleVersion}`
    : opts.moduleName;

  return {
    command: {
      program: 'npm',
      args: ['i', '-S', moduleName],
    },
    cwd: opts.cwd,
  };
}

function buildGitAddChanges(opts = {}) {
  return {
    command: {
      program: 'git',
      args: ['add', 'package.json', 'package-lock.json'],
    },
    cwd: opts.cwd,
  };
}

function buildGitCommit(opts = {}) {
  return {
    command: {
      program: 'git',
      args: ['commit', '-m', opts.commitMessage],
    },
    cwd: opts.cwd,
  };
}

function buildMergeBranch(opts = {}) {
  return {
    command: {
      program: 'git',
      args: ['merge', '--no-ff', buildBranchName(opts.moduleName, opts.branchName)],
    },
    cwd: opts.cwd,
  };
}

function buildRemoveBranch(opts = {}) {
  return {
    command: {
      program: 'git',
      args: ['branch', '-D', buildBranchName(opts.moduleName, opts.branchName)],
    },
    cwd: opts.cwd,
  };
}

function buildPush(opts = {}) {
  return {
    command: {
      program: 'git',
      args: ['push'],
    },
    cwd: opts.cwd,
  };
}


module.exports = {
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
};
