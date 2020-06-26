<<<<<<< HEAD
import Promise from 'bluebird';
import Data from '../data';
=======
import Data from "../data";
import Promise from 'bluebird';
>>>>>>> Change to ts
import {
  runGetModuleVersions,
} from '../actions/runners';

export default function defineVersionToUpdate(data: Data) : Promise<Data> {
  if (!data.moduleVersion) {
    return Promise.resolve(runGetModuleVersions(data))
      .tap((_data: Data) => {
        if (!_data.commandResult) {
          throw new Error(`No versions found for package "${data.moduleName}"`);
        }
      })
      .then((_data: Data) => Promise.resolve({
        ...data,
        moduleVersion: (_data.commandResult || '').slice(-1)[0],
      }));
  }

  return Promise.resolve(data);
}
