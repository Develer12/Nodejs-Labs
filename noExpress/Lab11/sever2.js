const WebSocket = require('ws');
const RPCWebSocket = require('rpc-websockets').Server;
const fs = require('fs');

const PORT = 4000;
const HOST = 'localhost';
const eventSocket = new RPCWebSocket({
    port: PORT,
    host: HOST,
    path: '/'
});
eventSocket.event('A');
eventSocket.event('B');
eventSocket.event('C');
console.log('Type A, B or C to fire such events');
let input = process.stdin;
input.setEncoding('utf-8');
process.stdout.write('> ');
input.on('data', data => {
    data = data.slice(0, 1);
    console.log(`|${data}|`);
    eventSocket.emit(data);
    process.stdout.write('> ');
});


const notificationSocket = new RPCWebSocket({
    port: PORT+1,
    host: HOST,
    path: '/'
});
notificationSocket.register('A', () => console.log('A notification was received')).public();
notificationSocket.register('B', () => console.log('B notification was received')).public();
notificationSocket.register('C', () => console.log('C notification was received')).public();
