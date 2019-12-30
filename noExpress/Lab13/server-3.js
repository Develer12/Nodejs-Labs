const net = require('net');

let HOST = '0.0.0.0';
let PORT_O = 4000;
let PORT_S = 5000;


net.createServer((Server)=>ServerStart(Server)).listen(PORT_O, HOST);
net.createServer((Server)=>ServerStart(Server)).listen(PORT_S, HOST);

function ServerStart(sock)
{
    console.log(`Server connected: ${sock.remoteAddress}:${sock.remotePort}`);
    sock.on('error', (e)=>{console.log(`Server error: ${e}`);});

    let num = 0;

    sock.on('data', (data)=>
    {
        num = data.readInt32LE().toString();
        console.log(`Server data: ${num}`);
        sock.write('ECHO: ' + num);
    });
}
