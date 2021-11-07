import { spawn, ChildProcess } from 'child_process';
import debug from 'debug';
import { debugName } from '../constants';
import Data, { Command, ParserFunction } from '../data';

const debugLog = debug(debugName);

function defaultStdioParser(/* _data */) {
  // do nothing;
  return '';
}

/**
 *
 * @param {Object} options {
 *  command: { program: '', args:[] },
 *  cwd: '',
 *  stdio: 'ignore|pipe|inherit'
 * }
 */
export function buildSpawnCommand({ command, cwd, stdio = 'ignore' }: Command) : ChildProcess {
  const { program, args = [] } = command;

  return spawn(program, args, {
    cwd,
    stdio,
  });
}

export function buildBranchName(moduleName: string, branchName:string): string {
  return branchName || `fix/update-${moduleName}`;
}

export function runCommand(data: Data, command: Command, commandName: string): Promise<Data> {
  const currentFolder = data.name || '';
  debugLog(currentFolder, commandName, command);

  return new Promise((resolve) => {
    const spawnCommand = buildSpawnCommand(command);
    let commandResult = '';
    let commandData = '';

    spawnCommand.on('exit', (code, signal) => {
      debugLog(`process ${commandName} for "${currentFolder}" exited with ${code} and ·${signal}. Resolve with`, { continue: code === 0 });
      resolve({ ...data, continue: code === 0, commandResult });
    });

    if (spawnCommand.stdout) {
      const parser: ParserFunction = command.stdioParser || defaultStdioParser;

      spawnCommand.stdout.on('data', (_data) => {
        commandData += new String(_data);
      });
      spawnCommand.stdout.on('end', () => {
        commandResult = parser(commandData);
      });
    }

    spawnCommand.on('error', (err) => {
      debugLog(`${commandName} error for ${currentFolder}`, err, '. Resolve with', { continue: false });
      resolve({ ...data, continue: false });
    });
  });
}
