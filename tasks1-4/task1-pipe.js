//--------------------------------------------------------------------------------------
/////pipe
//------------------------------------------------------------------------------
const fs = require('fs');

const readStream = fs.createReadStream("read.txt");
const writeStream = fs.createWriteStream("write.txt");
readStream.pipe(writeStream);
writeStream.on('finish', () => {
  console.log("File was read and written successfully using pipe!");
});


readStream.on("error", (err) => {
  console.error(err.message);
});

writeStream.on("error", (err) => {
  console.error(err.message);
});

