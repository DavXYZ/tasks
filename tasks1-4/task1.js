/*1. Basic Stream Operations
ask: Write a simple Node.js script using the `fs` \
module to read a text file and write
it to another text file using streams.
(Do this with and without pipes)*/

const fs = require('fs');

const readStream = fs.createReadStream("read.txt");
const writeStream = fs.createWriteStream("write.txt");

readStream.on('data', (chunk) => {
    if(!writeStream.write(chunk)){
        readStream.pause();
        writeStream.once('drain', () => {
            readStream.resume();
        })
    }
    
})

readStream.on('end', () => {
    console.log("File was read successfully !!!");
    writeStream.end();
})

readStream.on("error" , (err) => {
    console.error(err.message);
})

writeStream.on("error" , (err) => {
    console.error(err.message);
})
