import Promise from 'bluebird';
import Data, { ErrorHanlder } from '../data';

/**
 *
 * @returns { removeErrors(errorName: String), getErrors() }
 */
export default function buildErrorsHandler(): ErrorHanlder {
  const errors = new Map();

  function removeErrors(name: string) {
    return (list: [Data]) : Promise<[Data]> => {
      const deleted = list.filter((el) => !el.continue).map((el) => el.name);
      errors.set(name, deleted);

      return <Promise<[Data]>>Promise.filter(list, (el) => el.continue);
    };
  }

  function getErrors(): Map<string,[string]> {
    return errors;
  }

  return {
    removeErrors,
    getErrors,
  };
}
