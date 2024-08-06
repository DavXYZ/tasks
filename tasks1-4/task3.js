/*----------------------------------------------------
3.Implementing Basic Back Pressure
Task: Implement a readable and a
writable stream where the writable
stream deliberately writes data slower
than the readable reads it,
demonstrating how back pressure is managed.
*/

const { Readable , Writable } = require('stream');
const readableStream = new Readable({
  read(size) {
    if (this.counter === undefined) this.counter = 0;
    if (this.counter < 10) {
      const data = `Chunk ${this.counter++}\n`;
      const pushSuccess = this.push(data);
      if (!pushSuccess) {
        console.log('Backpressure: Readable stream is waiting for writable stream.');
      }
    } else {
      this.push(null); 
    }
  }
});

const slowWritableStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(`Processing: ${chunk.toString().trim()}`);
    setTimeout(() => {
      console.log(`Completed: ${chunk.toString().trim()}`);
      callback();
    }, 1500); 
  }
});

readableStream.pipe(slowWritableStream)
  .on('finish', () => {
    console.log('All data has been processed.');
  })
  .on('error', (err) => {
    console.error('Stream error:', err);
  });
