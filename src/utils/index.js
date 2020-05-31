const kleur = require('kleur');

exports.printStart = function printStart(data) {
  console.log(kleur.green('\nRun process with:'), data, '\n');
};

function printEmpty(list) {
  return !list.length ? '[]' : '';
}

function printErrors(errors) {
  console.log('Errors:');
  Object.keys(errors).forEach((block) => {
    console.log(`  ${block}: ${printEmpty(errors[block])}`);
    errors[block].forEach((project) => console.log(`    * ${kleur.red(project)}`));
  });
}

function printSuccess(success) {
  console.log(`Sucess: ${printEmpty(success)}`);
  success.forEach((project) => console.log(`  * ${kleur.green(project.name)}`));
}

exports.printEnd = function printEnd(data) {
  console.log(kleur.green('\nProcess finished with:'));
  printErrors(data.errors);
  printSuccess(data.success);
};

exports.printProjectsToUpdate = function printProjectsToUpdate(data) {
  console.log(kleur.green(`\nProjects to update (${data.length}):`));
  data.forEach((el) => console.log(`* ${el.name}`));
  console.log('\n');
};
