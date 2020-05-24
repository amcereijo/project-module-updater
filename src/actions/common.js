const { spawn } = require('child_process');
const debug = require('debug');
const { debugName } = require('../constants');

const debugLog = debug(debugName);

/**
 *
 * @param {Object} options {command: { program: '', args:[] }, cwd: ''}
 */
function buildSpawnCommand({ command = {}, cwd }) {
  const { program, args = [] } = command;

  return spawn(program, args, {
    cwd,
    stdio: 'ignore',
  });
}

function buildBranchName(moduleName) {
  return `fix/update-${moduleName}`;
}
function runCommand(data, command, commandName) {
  debugLog(data.name, commandName, command);

  return new Promise((resolve) => {
    const spawnCommand = buildSpawnCommand(command);

    spawnCommand.on('exit', (code, signal) => {
      debugLog(`process ${commandName} for ${data.name} exited with ${code} and ·${signal}. Resolve with`, { continue: code === 0 });
      resolve({ ...data, continue: code === 0 });
    });

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
