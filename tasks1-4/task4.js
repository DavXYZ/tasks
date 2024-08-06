/*4. HTTP Streaming
Task: Create an HTTP server using 
the `http` module that streams a
large file to the client upon 
request instead of loading
it into memory all at once.
*/

const http = require('http');
const fs = require('fs');

const PORT = 8080;
const filePath = __dirname + '/largefile.txt';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/viewFile') {
  
    fs.stat(filePath, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File not found');
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Server error');
        }
        return;
      }

      
      res.writeHead(200, {
        'Content-Type': 'text/plain', 
        'Content-Length': stats.size,
      });

      const readStream = fs.createReadStream(filePath, { highWaterMark: 16 * 1024 });

      readStream.pipe(res);

      readStream.on('error', (streamErr) => {
        console.error('Stream error:', streamErr);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
      });
    });

  } else if (req.method === 'GET' && req.url === '/downloadFile') {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File not found');
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Server error');
        }
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Length': stats.size,
        'Content-Disposition': 'attachment; filename=largefile.txt',
      });

      const readStream = fs.createReadStream(filePath, { highWaterMark: 16 * 1024 });

      readStream.pipe(res);

      readStream.on('error', (streamErr) => {
        console.error('Stream error:', streamErr);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
  console.log(`View file at http://localhost:${PORT}/viewFile`);
  console.log(`Download file at http://localhost:${PORT}/downloadFile`);
});
