const prompts = require('prompts');
const kleur = require('kleur');

const instructions = kleur.yellow(`
  Instructions:
    ${kleur.cyan().bold('a')}: Toggle ALL
    ${kleur.cyan().bold('↑/↓')}: Highlight option
    ${kleur.cyan().bold('←/→/[space]')}: Toggle selection
    ${kleur.cyan().bold('enter/return')}: Complete answer
`);

function buildChoices(data) {
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
async function filterByUserChoise(data) {
  const choices = buildChoices(data);
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
    format: (values) => (values || []).flat(),
  });

  return data
    .map((element) => ({
      ...element,
      continue: (response.projectsToUpdate || []).includes(element.name),
    }))
    .filter((_data) => _data.continue);
}

module.exports = filterByUserChoise;
