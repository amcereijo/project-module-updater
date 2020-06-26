import { promises as fs } from 'fs';

<<<<<<< HEAD
export default function isNodeProject(parentDir: string, folderName: string): Promise<boolean> {
=======
export default function isNodeProject(parentDir: String, folderName: String): Promise<boolean> {
>>>>>>> Change to ts
  return fs.stat(`${parentDir}/${folderName}/package.json`)
    .then(() => true)
    .catch(() => false);
}
