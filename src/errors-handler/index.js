const Promise = require('bluebird');

/**
 *
 * @returns { removeErrors(errorName: String), getErrors() }
 */
function buildErrorsHandler() {
  const errors = {
  };

  function removeErrors(name) {
    return (list) => {
      Object.assign(errors, {
        [name]: list.filter((el) => !el.continue).map((el) => el.name),
      });

      return Promise.filter(list, (el) => el.continue);
    };
  }

  function getErrors() {
    return errors;
  }

  return {
    removeErrors,
    getErrors,
  };
}

module.exports = buildErrorsHandler;
