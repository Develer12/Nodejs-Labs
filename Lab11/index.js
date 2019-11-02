const express = require('express');
let fs = require('fs');
const WebSocket = require('ws');

const PORT = 3000;
const HOST = 'localhost';

const app = express();
const wsupload = new WebSocket.Server({port: 4000, host: HOST});
const wsload = new WebSocket.Server({port: 5000, host: HOST});


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
    const duplex = WebSocket.createWebSocketStream(wsupload, {encoding: 'utf8'});
    let uf = fs.createWriteStream(__dirname +`/files/${k++}.txt`);
    duplex.pipe(uf);
})
.on('error', (e)=> {console.log('WS server error ', e);});


wsload.on('connection', (ws) =>
{
    console.log('WS broadcast connection');
    ws.on('message', message =>
    {
        wsbroad.clients.forEach((client)=>
        {
            console.log('Client message: ' + message);
            if(client.readyState === WebSocket.OPEN)
                client.send('Server ' + message)
        });
    });
});

wsload.on('open', () =>
{
    let timer = ' ';
    let k = 0;
    timer = setInterval(() => wsbroad.send(`Client: -${k++}`));
    wsbroad.on('message', (message) =>
    {
        console.log(`Received message => ${message}`);
    });

    setTimeout(() => { clearInterval(timer); wsbroad.close();}, 25000);
})
.on('error', (e)=> {console.log('WS server error ', e);});
