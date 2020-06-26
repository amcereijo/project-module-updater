import Promise from 'bluebird';
<<<<<<< HEAD
<<<<<<< HEAD
import Data, { ErrorHanlder } from '../data';
=======
import Data from '../data';
>>>>>>> Change to ts
=======
import Data, { ErrorHanlder } from '../data';
>>>>>>> Linting

/**
 *
 * @returns { removeErrors(errorName: String), getErrors() }
 */
<<<<<<< HEAD
<<<<<<< HEAD
export default function buildErrorsHandler(): ErrorHanlder {
=======
export default function buildErrorsHandler() {
>>>>>>> Change to ts
=======
export default function buildErrorsHandler(): ErrorHanlder {
>>>>>>> Linting
  const errors = new Map();

  function removeErrors(name: string) {
    return (list: [Data]) : Promise<[Data]> => {
<<<<<<< HEAD
      const deleted = list.filter((el) => !el.continue).map((el) => el.name);
      errors.set(name, deleted);
=======
      Object.assign(errors, {
        [name]: list.filter((el) => !el.continue).map((el) => el.name),
      });
>>>>>>> Change to ts

      return <Promise<[Data]>>Promise.filter(list, (el) => el.continue);
    };
  }

<<<<<<< HEAD
<<<<<<< HEAD
  function getErrors(): Map<string,[string]> {
=======
  function getErrors(): Object {
>>>>>>> Change to ts
=======
  function getErrors(): Map<string,[string]> {
>>>>>>> Linting
    return errors;
  }

  return {
    removeErrors,
    getErrors,
  };
}
