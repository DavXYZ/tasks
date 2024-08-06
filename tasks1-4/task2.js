/*
2. Transform Streams Homework
Task:
Create a Node.js script that
uses a transform stream to handle JSON objects,
modifying each one by adding a new property
timestamp and converting it back into a
string before writing it to an output file.
*/

const fs = require('fs');
const { Transform } = require('stream');

const transformStream = new Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    try {
      const obj = JSON.parse(chunk);
      obj.timestamp = new Date().toISOString();
      console.log(obj);
      infoStrJson = JSON.stringify(obj)
      this.push(infoStrJson);
      cb();
    }
     catch (err) {
      cb(err);
    }
  }
});

const readStream = fs.createReadStream('read.json', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('write.json', { encoding: 'utf8' });

readStream
  .pipe(transformStream)
  .pipe(writeStream)
  .on('finish', () => {
    console.log('Transformation complete. Output written to write.json.');
  })
  .on('error', (err) => {
    console.error('Error:', err.message);
  });


