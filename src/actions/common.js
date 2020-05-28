const { spawn } = require('child_process');
const debug = require('debug');
const { debugName } = require('../constants');

const debugLog = debug(debugName);

function defaultStdioParser(/* _data */) {
  // do nothing;
}

/**
 *
 * @param {Object} options {
 *  command: { program: '', args:[] },
 *  cwd: '',
 *  stdio: 'ignore|pipe|inherit'
 * }
 */
function buildSpawnCommand({ command = {}, cwd, stdio = 'ignore' }) {
  const { program, args = [] } = command;

  return spawn(program, args, {
    cwd,
    stdio,
  });
}

function buildBranchName(moduleName, branchName) {
  return branchName || `fix/update-${moduleName}`;
}
function runCommand(data, command, commandName) {
  debugLog(data.name, commandName, command);

  return new Promise((resolve) => {
    const spawnCommand = buildSpawnCommand(command);
    let commandResult;

    spawnCommand.on('exit', (code, signal) => {
      debugLog(`process ${commandName} for ${data.name} exited with ${code} and ·${signal}. Resolve with`, { continue: code === 0 });
      resolve({ ...data, continue: code === 0, commandResult });
    });

    if (spawnCommand.stdout) {
      const parser = command.stdioParser || defaultStdioParser;

      spawnCommand.stdout.on('data', (_data) => {
        commandResult = parser(_data);
      });
    }

    spawnCommand.on('error', (err) => {
      debugLog(`${commandName} error for ${data.name}`, err, '. Resolve with', { continue: false });
      resolve({ ...data, continue: false });
    });
  });
}

module.exports = {
  buildBranchName,
  buildSpawnCommand,
  runCommand,
};
