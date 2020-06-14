const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:4000/ws');

ws.on('open', ()=>{
    ws.on('message', message =>{
        console.log(`Received message => ${message}`)
    message = JSON.parse(message).msg;
    ws.send(message);
    })
    setTimeout(()=>{ws.close()}, 25000);
});
