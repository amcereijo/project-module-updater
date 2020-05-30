const prompts = require('prompts');

async function checkIfWantupdateAll() {
  const response = await prompts({
    type: 'confirm',
    name: 'updateAll',
    message: 'Update All?',
    initial: true,
  });

  return response.updateAll;
}

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
  const updateAll = await checkIfWantupdateAll();

  if (!updateAll) {
    const choices = buildChoices(data);

    const response = await prompts({
      type: 'multiselect',
      name: 'projectsToUpdate',
      message: 'Select projects to update',
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

  return data;
}

module.exports = filterByUserChoise;
