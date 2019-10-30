const express = require('express');
let fs = require('fs');
const WebSocket = require('ws');

const PORT = 3000;
const HOST = 'localhost';

const app = express();
const wsserv = new WebSocket.Server({port: 4000, host: HOST, path: '/wsserv'});


const server = app.listen(PORT, HOST, () =>
{
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});


app.get('/start', (req, res) =>
{
    res.end(fs.readFileSync(__dirname + "/index.html"));
});

let k = 0;
let mess = 0;
wsserv.on('connection', (ws) =>
{
    console.log('WS connection');
    ws.on('message', message =>
    {
        mess = message;
        console.log(`client=> ${message}; server=> ${k}`);
    });
    let timer = setInterval(()=> ws.send(`10-01-server: ${mess}->${k++}`), 5000);

})
.on('error', (e)=> {console.log('WS server error ', e);});
