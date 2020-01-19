const http = require('http');
let fs = require('fs');
const WebSocket = require('ws');

const PORT = 3000;
const HOST = 'localhost';

const wsupload = new WebSocket.Server({port: 4000, host: HOST});
const wsload = new WebSocket.Server({port: 5000, host: HOST, path: '/download'});
const wspipo = new WebSocket.Server({port: 4001, host: HOST});
const wsjson = new WebSocket.Server({port: 4002, host: HOST});
const wsrpc = new RPC({port: 4003, host: HOST});


const server = http.createServer().listen(PORT, (v) =>
{
  console.log(`Listening on http://localhost:${PORT}`);
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

let messnum = 0;
wsjson.on('connection', (ws)=>
{
    ws.on('message', (message)=>
    {
        let {client: name, timestamp: date} = JSON.parse(message);
        let postoffice = {num: ++messnum, client: name, timestamp: date};
        ws.send(JSON.stringify(postoffice));
    });
})
.on('error', (e)=> {console.log('WS server error ', e);});

wsrpc.setAuth(credentials => credentials.login === 'admin' && credentials.password === 'admin');
wsrpc.register('sum', params => params.reduce((a, b) => a + b, 0)).public();
wsrpc.register('mul', params => params.reduce((a, b) => a * b, 1)).public();
wsrpc.register('square', square).public();
wsrpc.register('fib', fib).protected();
wsrpc.register('fact', fact).protected();

function square(args)
{
    if (args.length === 1) return Math.PI * Math.pow(args[0], 2);
    else if (args.length === 2) return args[0] * args[1];
    else return 0;
}
function fib(n)
{
    let currentSize = 0;
    let numbers = [];
    let curr = 1;
    let next = 1;
    while (currentSize < n)
    {
        numbers.push(curr + next);
        next += curr;
        curr = next - curr;
        currentSize++;
    }
    return numbers;
}
function fact(n) {return n === 1 ? 1 : n * fact(n - 1);}
