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

<<<<<<< HEAD
<<<<<<< HEAD:src/actions/common.ts
export function buildBranchName(moduleName: string, branchName:string): string {
=======
export function buildBranchName(moduleName: string, branchName:string) {
>>>>>>> Change to ts:src/actions/common.ts
=======
export function buildBranchName(moduleName: string, branchName:string): string {
>>>>>>> Linting
  return branchName || `fix/update-${moduleName}`;
}
export function runCommand(data: Data, command: Command, commandName: string): Promise<Data> {
  debugLog(data.name, commandName, command);

  return new Promise((resolve) => {
    const spawnCommand = buildSpawnCommand(command);
<<<<<<< HEAD
<<<<<<< HEAD:src/actions/common.ts
    let commandResult = '';
=======
    let commandResult: string = '';
>>>>>>> Change to ts:src/actions/common.ts
=======
    let commandResult = '';
>>>>>>> Linting

    spawnCommand.on('exit', (code, signal) => {
      debugLog(`process ${commandName} for ${data.name} exited with ${code} and ·${signal}. Resolve with`, { continue: code === 0 });
      resolve({ ...data, continue: code === 0, commandResult });
    });

    if (spawnCommand.stdout) {
      const parser: ParserFunction = command.stdioParser || defaultStdioParser;

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
