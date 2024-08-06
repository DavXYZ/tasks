const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 8080;
const logFilePath = path.join(__dirname, 'client_data.json');

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/log', (req, res) => {
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Failed to read log file');
            console.error('Error reading log file:', err.message);
            return;
        }
        res.send(`<pre>${data}</pre>`);
    });
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('clientData', (data) => {
        const { username, text } = data;
        const timestamp = new Date().toISOString();
        const message = {
            username,
            text,
            timestamp
        };

        fs.readFile(logFilePath, 'utf8', (err, fileData) => {
            let messages = [];

            if (!err && fileData) {
                try {
                    messages = JSON.parse(fileData);
                } catch (parseErr) {
                    console.error('Error parsing JSON:', parseErr.message);
                }
            }

            messages.push(message);

            fs.writeFile(logFilePath, JSON.stringify(messages, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Failed to write to file:', writeErr.message);
                }
            });
        });

        socket.emit('serverResponse', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
});
