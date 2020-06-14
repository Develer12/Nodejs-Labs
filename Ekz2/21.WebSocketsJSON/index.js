const WebSocket = require('ws');

let k=0;
const ws = new WebSocket.Server({port:4000, host:'localhost', path:'/ws'});
ws.on('connection', (wss)=>{
    let mess;
    wss.on('message', message =>{
        console.log(`Received message => client: ${message}`);
        mess = message;
    })
    setInterval(()=>{wss.send(JSON.stringify({msg: ++k}))}, 5000);
})
ws.on('error', (e)=>{console.log('ws server error', e)});
console.log(`ws server: host:${ws.options.host}, port:${ws.options.port}, path:${ws.options.path}`);
