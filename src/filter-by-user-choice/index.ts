<<<<<<< HEAD
<<<<<<< HEAD:src/filter-by-user-choice/index.ts
import prompts from 'prompts';
import kleur from 'kleur';
import Data from '../data';
=======
import Data from "../data";
import prompts from 'prompts';
import kleur from 'kleur';
>>>>>>> Change to ts:src/filter-by-user-choice/index.ts
=======
import prompts from 'prompts';
import kleur from 'kleur';
import Data from '../data';
>>>>>>> Linting

const instructions = kleur.yellow(`
  Instructions:
    ${kleur.cyan().bold('a')}: Toggle ALL
    ${kleur.cyan().bold('↑/↓')}: Highlight option
    ${kleur.cyan().bold('←/→/[space]')}: Toggle selection
    ${kleur.cyan().bold('enter/return')}: Complete answer
`);

function buildChoices(data: [Data]) {
  return data.map((element) => ({ title: element.name, value: [element.name] }));
}

/**
 *
 * @param {Array} data [{
    moduleName: String,
    moduleVersion: String,
    defaultBranch: String,
    parentDir: String,
    push: boolean,
    name: String,
    continue: true
 * }]
 */
<<<<<<< HEAD
<<<<<<< HEAD:src/filter-by-user-choice/index.ts
export default async function filterByUserChoice(data: [Data]) : Promise<[Data]> {
=======
export default async function filterByUserChoice(data: [Data]) : Promise<[Data]>{
>>>>>>> Change to ts:src/filter-by-user-choice/index.ts
=======
export default async function filterByUserChoice(data: [Data]) : Promise<[Data]> {
>>>>>>> Linting
  const choices = buildChoices(data);

  if (!choices.length) {
    return data;
  }

  const response = await prompts({
    type: 'multiselect',
    name: 'projectsToUpdate',
    instructions,
    message: 'Select projects to update',
    onRender() {
      this.msg = kleur.green(this.msg);
    },
    choices,
    hint: '- Space to select. Return to submit',
    format: (values: [string]) => (values || []).flat(),
  });

  const filteredData = data
    .map((element) => ({
      ...element,
      continue: (response.projectsToUpdate || []).includes(element.name),
    }))
    .filter((_data) => _data.continue);

  return <Promise<[Data]>>Promise.resolve(filteredData);
}
