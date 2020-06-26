import { promises as fs } from 'fs';
import Promise from 'bluebird';
import Data from '../data';
import isNodeProject from './is-node-project';

/**
 *
 * @param {Object} data {defaultBranch: String ,moduleName: String, push: boolean }
 *
 * @returns {Promise<[Data]>}
 */
export default function readNodeProjects(data: Data): Promise<[Data]> {
  return <Promise<[Data]>>Promise.resolve(fs.readdir(String(data.parentDir)))
    .map((f) => Promise.props({
      ...data,
      name: `${data.parentDir}/${f}`,
      continue: isNodeProject(data.parentDir, f),
    }))
    .filter((_data) => Promise.resolve(_data.continue));
}
