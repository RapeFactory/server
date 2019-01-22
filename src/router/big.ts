import fs from 'fs';
import path from 'path';

import { Context } from './index';

export default function({ req, res }: Context) {
  const fileStream = fs.createReadStream(
    path.join(__dirname, '/../../public/big.html'),
    {
      encoding: 'utf-8',
      highWaterMark: 1024,
    },
  );

  sendFile(fileStream, res);

  // fileStream.pipe(res);

  fileStream.on('error', err => {
    console.log(err);
    res.writeHead(500);
    res.end('Server Error');
  });
}

function sendFile(fileStream: fs.ReadStream, res: Context['res']) {
  fileStream.on('readable', write);

  function write() {
    const fileChunk = fileStream.read();

    const isWrite = fileChunk && res.write(fileChunk, 'utf-8');

    if (!isWrite) {
      fileStream.removeListener('readable', write);

      res.once('drain', function() {
        fileStream.on('readable', write);
      });
    }
  }

  fileStream.on('end', function() {
    res.end();
  });
}
