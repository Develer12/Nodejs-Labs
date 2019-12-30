const net = require('net');

let HOST = '0.0.0.0';
let PORT = 4000;


net.createServer((sock)=>
{
    sock.on('error', (e)=>{console.log(`Server error: ${e}`);});

    console.log(`Server connected: ${sock.remoteAddress}:${sock.remotePort}`);

    sock.on('data', (data)=>
    {
        console.log(`Server data: ${data.toString()}`);
        sock.write(`Echo=> ${data}`);
    });

    sock.on('close', data=>{console.log("Server closed");});
}).listen(PORT, HOST);
