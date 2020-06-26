<<<<<<< HEAD
import { StdioOptions } from "child_process";
import Promise from 'bluebird';
=======
>>>>>>> Change to ts

export default interface Data {
  moduleName: string,
  moduleVersion: string
  defaultBranch: string,
  parentDir: string,
  push: boolean,
  projects:[string],
  message: string,
  updateBranchName: string,

  name?: string,
  continue?: boolean,
  commandResult?: string,
}

export interface ParserFunction {
  (data:Data): string
<<<<<<< HEAD
}

export interface Command {
  command: {
    program: string,
    args: Array<string>,
  },
  cwd?: string,
  stdio?: StdioOptions,
  stdioParser?: ParserFunction
}

export interface CommandBuilder {
  cwd?: string,
  branch?: string
  moduleName?: string,
  branchName?: string,
  moduleVersion?: string,
  commitMessage?: string
}
=======
};

export interface Command {
  command: {
    program: 'git',
    args: [string],
  },
  cwd?: string,
  stdio?: "ignore",
  stdioParser?: ParserFunction,
};
>>>>>>> Change to ts

export interface DataResult {
  success: [Data],
  errors: Map<string, [string]>,
<<<<<<< HEAD
}

export interface RemoveErrorInterface {
  (list: [Data]): Promise<[Data]>
}

export interface BuildRemoveErrorInterface {
  (name: string): RemoveErrorInterface
}

export interface GetErrorInterface {
  (): Map<string, [string]>
}

export interface ErrorHanlder {
  removeErrors: BuildRemoveErrorInterface,
  getErrors: GetErrorInterface,
=======
>>>>>>> Change to ts
}