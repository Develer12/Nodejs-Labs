let fs = require('fs');
const WebSocket = require('ws');


const ws = new WebSocket('ws:/localhost:4000');
ws.on('open', () =>
{
  console.log("Upload file");
  const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf8'});
  let uf = fs.createReadStream(__dirname + `/files/file.txt`);
  uf.pipe(duplex);
})
.on('error', (e)=> {console.log('WS server error ', e);});
