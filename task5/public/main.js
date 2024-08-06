const socket = io();

function formatTimestamp(isoString) {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }).format(date);
}

function addMessage(type, username, message, timestamp) {
    const messages = document.getElementById('messages');
    const messageLi = document.createElement('li');
    messageLi.className = type;
    messageLi.innerHTML = `<strong>${username}</strong>: ${message} <span class="timestamp">(${timestamp})</span>`;
    messages.appendChild(messageLi);
    messages.scrollTop = messages.scrollHeight; 
}

socket.on('serverResponse', (data) => {
    const formattedTimestamp = formatTimestamp(data.timestamp);
    addMessage('server', 'Server', data.text, formattedTimestamp);
});

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value || 'Anonymous';
    const inputData = document.getElementById('input').value;
    const timestamp = new Date().toISOString();
    addMessage('client', username, inputData, formatTimestamp(timestamp));
    socket.emit('clientData', { username, text: inputData, timestamp });
    document.getElementById('input').value = ''; 
});
