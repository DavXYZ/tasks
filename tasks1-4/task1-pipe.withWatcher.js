
const fs = require('fs');

const readFilePath = 'read.txt';
const writeFilePath = 'write.txt';

function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, wait);
  };
}

function copyFile() {
  const readStream = fs.createReadStream(readFilePath);
  const writeStream = fs.createWriteStream(writeFilePath);

  readStream.on('data', (chunk) => {
    if (!writeStream.write(chunk)) {
      readStream.pause();
      writeStream.once('drain', () => {
        readStream.resume();
      });
    }
  });

  readStream.on('end', () => {
    console.log("File was read and written successfully!");
    console.log('Waiting for changes in read.txt...');
    writeStream.end();
  });

  readStream.on('error', (err) => {
    console.error('Read Stream Error:', err.message);
  });

  writeStream.on('error', (err) => {
    console.error('Write Stream Error:', err.message);
  });
  
}

const debouncedLog = debounce(() => {
  console.log('Detected a change in read.txt, updating write.txt...');
  copyFile();
}, 1000); 


copyFile();
fs.watch(readFilePath, (eventType) => {
  if (eventType === 'change') {
    debouncedLog();
  }
});



