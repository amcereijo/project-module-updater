import { CommandBuilder, Command } from '../data'
import { buildBranchName } from './common';

export function buildCheckOut(opts: CommandBuilder): Command {
  return {
    command: {
      program: 'git',
      args: ['checkout', opts.branch],
    },
    cwd: opts.cwd,
  };
}

export function buildPull(opts: CommandBuilder): Command {
  return {
    command: {
      program: 'git',
      args: ['pull'],
    },
    cwd: opts.cwd,
  };
}

export function buildNpmInstall(opts: CommandBuilder): Command {
  return {
    command: {
      program: 'npm',
      args: ['i'],
    },
    cwd: opts.cwd,
  };
}

<<<<<<< HEAD
export function buildCheckoutBranch(opts: CommandBuilder): Command {
=======
export function buildNewBranch(opts: CommandBuilder): Command {
>>>>>>> Linting
  return {
    command: {
      program: 'git',
      args: ['checkout', '-b', buildBranchName(opts.moduleName, opts.branchName)],
    },
    cwd: opts.cwd,
  };
}

<<<<<<< HEAD
=======
export function buildCheckoutBranch(opts: CommandBuilder): Command {
  return {
    command: {
      program: 'git',
      args: ['checkout', buildBranchName(opts.moduleName, opts.branchName)],
    },
    cwd: opts.cwd,
  };
}

>>>>>>> Linting
export function buildUninstallPackage(opts: CommandBuilder): Command {
  return {
    command: {
      program: 'npm',
      args: ['uninstall', opts.moduleName],
    },
    cwd: opts.cwd,
  };
}

export function buildInstallPackage(opts: CommandBuilder): Command {
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

export function buildGitAddChanges(opts: CommandBuilder): Command {
  return {
    command: {
      program: 'git',
      args: ['add', 'package.json', 'package-lock.json'],
    },
    cwd: opts.cwd,
  };
}

export function buildGitCommit(opts: CommandBuilder): Command {
  return {
    command: {
      program: 'git',
      args: ['commit', '-m', opts.commitMessage],
    },
    cwd: opts.cwd,
  };
}

export function buildMergeBranch(opts: CommandBuilder): Command {
  return {
    command: {
      program: 'git',
      args: ['merge', '--no-ff', buildBranchName(opts.moduleName, opts.branchName)],
    },
    cwd: opts.cwd,
  };
}

export function buildRemoveBranch(opts: CommandBuilder): Command {
  return {
    command: {
      program: 'git',
      args: ['branch', '-D', buildBranchName(opts.moduleName, opts.branchName)],
    },
    cwd: opts.cwd,
  };
}

export function buildPush(opts: CommandBuilder): Command {
  return {
    command: {
      program: 'git',
      args: ['push'],
    },
    cwd: opts.cwd,
  };
}

export function buildGetVersions(opts: CommandBuilder): Command {
  return {
    command: {
      program: 'npm',
      args: ['show', opts.moduleName, 'versions'],
    },
    cwd: opts.cwd,
    stdio: 'pipe',
    stdioParser: (_data) => JSON.parse(String(_data).replace(/'/g, '"')),
  };
}
