const WebSocket = require('ws');
const RPCWebSocket = require('rpc-websockets').Client;
const fs = require('fs');

const eventSocket = new RPCWebSocket('ws://localhost:4000');
eventSocket.on('open', () => {
    eventSocket.subscribe('A');
    eventSocket.subscribe('B');
    eventSocket.subscribe('C');
    eventSocket.on('A', () => console.log('A event was fired'));
    eventSocket.on('B', () => console.log('B event was fired'));
    eventSocket.on('C', () => console.log('C event was fired'));
});


const notificationSocket = new RPCWebSocket('ws://localhost:4001');
notificationSocket.on('open', () => {
    console.log('Type one from A, B, C to send to the server appropriate notification');
    let input = process.stdin;
    input.setEncoding('utf-8');
    process.stdout.write('> ');
    input.on('data', data => {
        data = data.slice(0, 1);
        console.log(`|${data}|`);
        notificationSocket.notify(data);
        process.stdout.write('> ');
    });
});
