import kleur from 'kleur';
import Data, {DataResult} from '../data';

export function printStart(data: Data): void {
  console.log(kleur.green('\nRun process with:'), data, '\n');
};

function printEmpty(list: [Object]) {
  return !list.length ? '[]' : '';
}

function printErrors(errors: Map<String, [string]>) {
  console.log('Errors:');
  errors.forEach((value, key) => {
    console.log(`  ${key}: ${printEmpty(value)}`);
    value.forEach((project) => console.log(`    * ${kleur.red(project)}`));
  })
}

function printSuccess(success: [Data]) {
  console.log(`Success: ${printEmpty(success)}`);
  success.forEach((project) => console.log(`  * ${kleur.green(project.name)}`));
}

export function printEnd(data: DataResult) {
  console.log(kleur.green('\nProcess finished with:'));
  printErrors(data.errors);
  printSuccess(data.success);
};

export function printProjectsToUpdate(data: any): void {
  console.log(kleur.green(`\nProjects to update (${<[Data]>data.length}):`));
  <[Data]>data.forEach((el: Data) => console.log(`* ${el.name}`));
  console.log('\n');
};

export function bypassFunction(args: [Data]): Promise<[Data]> {
  return Promise.resolve(args);
};
