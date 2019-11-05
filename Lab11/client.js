let fs = require('fs');
const WebSocket = require('ws');
const rpc = require('rpc-websockets').Client;



const ws = new WebSocket('ws:/localhost:4000');
ws.on('open', () =>
{
  console.log("Upload file");
  const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf8'});
  let uf = fs.createReadStream(__dirname + `/files/file.txt`);
  uf.pipe(duplex);
})
.on('error', (e)=> {console.log('WS server error ', e);});


const wsload = new WebSocket('ws:/localhost:5000/download');
let k = 0;
wsload.on('open', () =>
{
    console.log('Download started');
    const duplex = WebSocket.createWebSocketStream(wsload, {encoding: 'utf8'});
    let uf = fs.createWriteStream(__dirname +`/files/${k++}load.txt`);
    duplex.pipe(uf);
})
.on('error', (e)=> {console.log('WS server error ', e);});


const wspong = new WebSocket('ws:/localhost:4001');
wspong.on('pong', (data) =>
{
    console.log('Pong started');
    wspong.ping(1);
})
.on('error', (e)=> {console.log('WS server error ', e);});
wspong.onmessage = (e) => {console.log("Message server: ", e.data);};


let name = 0;
const wsrpc = new WebSocket('ws:/localhost:4002');
wsrpc.onopen = () =>
{
    let message = {client: ++name, timestamp: new Date()};
    wsrpc.send(JSON.stringify(message));
};
wsrpc.onmessage = message => {console.log(message.data);};
