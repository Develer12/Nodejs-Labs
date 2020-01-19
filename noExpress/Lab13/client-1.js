const net = require('net');

let HOST = '127.0.0.1';
let PORT = 4000;

let client = new net.Socket();
client.connect(PORT, HOST, ()=>{console.log(`Client connected: ${client.remoteAddress}:${client.remotePort}`);});

client.write('Message for Server');

client.on('data', data=>{console.log(`Client data: ${data.toString().slice(0, 25)}`); client.destroy();});

client.on('close', ()=>{console.log('Client closed');});

client.on('error', (e)=>{console.log('Client error: ', e);});
