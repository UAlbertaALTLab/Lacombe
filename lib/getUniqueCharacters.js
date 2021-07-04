/**
 * This script creates a list of all the unique characters in a file.
 */

import { promises as fsPromises } from 'fs';

const { readFile } = fsPromises;

void async function getUniqueCharacters() {

  const [,, filePath] = process.argv;
  const text          = await readFile(filePath, `utf8`);

  const uniqueCharacters = Array.from(new Set(text))
  .sort()
  .map(char => char.trim())
  .filter(Boolean)
  .join(``);

  console.info(`\n${uniqueCharacters}\n`)

}();
