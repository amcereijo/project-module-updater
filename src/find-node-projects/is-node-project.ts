import { promises as fs } from 'fs';

export default function isNodeProject(parentDir: string, folderName: string): Promise<boolean> {
  return fs.stat(`${parentDir}/${folderName}/package.json`)
    .then(() => true)
    .catch(() => false);
}
