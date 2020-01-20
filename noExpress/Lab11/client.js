let fs = require('fs');
const WebSocket = require('ws');
const rpc = require('rpc-websockets').Client;
const async = require('async');

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
const wsjson = new WebSocket('ws:/localhost:4002');
wsjson.onopen = () =>
{
    let message = {client: ++name, timestamp: new Date()};
    wsjson.send(JSON.stringify(message));
};
wsjson.onmessage = message => {console.log(message.data);};


const wsrpc = new rpc('ws://localhost:4003');
wsrpc.on('open', () =>
{
    console.log("RPC");
    wsrpc.call('square', [5]).then(answer => console.log('square: ' + answer));
    wsrpc.call('square', [5, 4]).then(answer => console.log('square: ' + answer));
    wsrpc.call('sum', [2, 4, 6, 8, 10]).then(answer => console.log('sum: ' + answer));
    wsrpc.call('mul', [3, 5, 7, 9, 11, 13]).then(answer => console.log('mul: ' + answer));
    wsrpc.login({login: 'admin', password: 'admin'})
      .then(async login =>
      {
          if (login)
          {
            wsrpc.call('fib', 7).then(answer => console.log('fib: ' + answer));
            wsrpc.call('fact', 5).then(answer => console.log('fact: ' + answer));
            await calc();
          }
          else
          {
            console.log('Unauthorized');
          }
      });
});

const wsrpc2 = new rpc('ws://localhost:4010');
wsrpc2.on('open', () => {
  async.parallel(
  {
    square1: ()=>{wsrpc2.call('square', [5]).then(answer => console.log('async/parallel square: ' + answer));},
    square: ()=>{wsrpc2.call('square', [5, 4]).then(answer => console.log('async/parallel square: ' + answer));},
    sum: ()=>{wsrpc2.call('sum', [2, 4, 6, 8, 10]).then(answer => console.log('async/parallel sum: ' + answer));},
    mul: ()=>{wsrpc2.call('mul', [3, 5, 7, 9, 11, 13]).then(answer => console.log('async/parallel mul: ' + answer));},
    fib: ()=>{wsrpc2.login({login: 'admin', password: 'admin'})
      .then(async login =>
      {
          if (login)
          {
            wsrpc2.call('fib', 7).then(answer => console.log('async/parallel fib: ' + answer));
          }
          else
          {
            console.log('async/parallel Unauthorized');
          }
      });},
    fact: ()=>{wsrpc2.login({login: 'admin', password: 'admin'})
      .then(async login =>
      {
          if (login)
          {
            wsrpc2.call('fact', 5).then(answer => console.log('async/parallel fact: ' + answer));
          }
          else
          {
            console.log('async/parallel Unauthorized');
          }
      });}

  });
});
async function calc()
{
    console.log('Result: ' + await wsrpc.call('sum',
        [
            await wsrpc.call('square', [3]),
            await wsrpc.call('square', [5, 4]),
            await wsrpc.call('mul', [3, 5, 7, 9, 11, 13])
        ])
        + (await wsrpc.call('fib', 7)).reduce((a, b) => a + b, 0)
        * await wsrpc.call('mul', [2, 4, 6])
    );
}
