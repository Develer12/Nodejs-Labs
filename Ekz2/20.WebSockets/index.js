const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

http.createServer((req, res)=>{
    if(req.method == 'GET'){
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end(fs.readFileSync('./index.html'));
    }
    else{
        res.statusCode=405;
        res.end();
    }
}).listen(3000);

let k=0;
const ws = new WebSocket.Server({port:4000, host:'localhost', path:'/ws'});
ws.on('connection', (wss)=>{
    wss.on('message', message =>{
        console.log(`Received message => ${message}`);
    })
    setInterval(()=>{wss.send(`server: ${++k}`)}, 5000);
})
ws.on('error', (e)=>{console.log('ws server error', e)});
console.log(`ws server: host:${ws.options.host}, port:${ws.options.port}, path:${ws.options.path}`);