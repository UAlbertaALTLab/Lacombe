import {
  extname as getExt,
  join as joinPath,
} from 'path';

import {
  createWriteStream,
  promises as fsPromises,
} from 'fs';

const {
  readdir: readDir,
  readFile,
} = fsPromises;

void async function concat() {

  const [,, directory, outfile] = process.argv;
  const filenames               = await readDir(directory);

  const writeStream = createWriteStream(outfile);

  const done = new Promise((resolve, reject) => {
    writeStream.on(`error`, reject);
    writeStream.on(`finish`, resolve);
  });

  for (const filename of filenames) {

    const ext = getExt(filename);

    if (ext !== `.txt`) continue;

    const text = await readFile(joinPath(directory, filename));

    writeStream.write(`${ text }\r\n`);

  }

  writeStream.end();

  return done;

}();
