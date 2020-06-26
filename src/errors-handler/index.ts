import Promise from 'bluebird';
import Data from '../data';

/**
 *
 * @returns { removeErrors(errorName: String), getErrors() }
 */
export default function buildErrorsHandler() {
  const errors = new Map();

  function removeErrors(name: string) {
    return (list: [Data]) : Promise<[Data]> => {
      Object.assign(errors, {
        [name]: list.filter((el) => !el.continue).map((el) => el.name),
      });

      return <Promise<[Data]>>Promise.filter(list, (el) => el.continue);
    };
  }

  function getErrors(): Object {
    return errors;
  }

  return {
    removeErrors,
    getErrors,
  };
}
