const express = require('express');
let fs = require('fs');
const WebSocket = require('ws');
const RPC = require('rpc-websockets').Server;


const PORT = 3000;
const HOST = 'localhost';

const app = express();
const wsupload = new WebSocket.Server({port: 4000, host: HOST});
const wsload = new WebSocket.Server({port: 5000, host: HOST, path: '/download'});
const wspipo = new WebSocket.Server({port: 4001, host: HOST});
const wsrpc = new WebSocket.Server({port: 4002, host: HOST});



const server = app.listen(PORT, HOST, () =>
{
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});


let k = 0;
wsupload.on('connection', (ws) =>
{
    console.log('Upload started');
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf8'});
    let uf = fs.createWriteStream(__dirname +`/files/${k++}.txt`);
    duplex.pipe(uf);
})
.on('error', (e)=> {console.log('WS server error ', e);});


wsload.on('connection', (ws) =>
{
    console.log('Download started');
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf8'});
    let uf = fs.createReadStream(__dirname +`/files/file.txt`);
    uf.pipe(duplex);
})
.on('error', (e)=> {console.log('WS server error ', e);});


let n = 1;
let activeClient = 0;
wspipo.on('connection', (ws) =>
{
    ws.on('pong', data =>
    {
        activeClient+=parseInt(data, 10);
    });
    setInterval(() =>
    {
        wspipo.clients.forEach(client =>
        {
            client.ping(1);
        });
        console.log('Active: ' + (activeClient));
        activeClient = 0;

    }, 5000);

    setInterval(()=>
    {
      wspipo.clients.forEach((client)=>
      {
          if(client.readyState === WebSocket.OPEN)
              client.send('Server:' + n++);
      });
    }, 15000);
})
.on('error', (e)=> {console.log('WS server error ', e);});
