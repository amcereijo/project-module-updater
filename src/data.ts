
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

export interface DataResult {
  success: [Data],
  errors: Map<string, [string]>,
}