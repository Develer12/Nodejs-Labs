const http = require('http');
let fs = require('fs');
const WebSocket = require('ws');

const PORT = 3000;
const HOST = 'localhost'

const wsserv = new WebSocket.Server({port: 4000, host: HOST, path: '/wsserv'});
const wsbroad = new WebSocket.Server({port: 5000, host: HOST, path: '/broadcast'});


let http_handler = (req, res)=>
{
  switch (req.method)
  {
    case 'GET': GET_handler(req, res);  break;
    default: HTTP404(req, res);  break;
  }
};

let GET_handler = (req, res)=>
{
  switch (req.url)
  {
    case '/start':
      res.end(fs.readFileSync(__dirname + "/index.html"));
      break;
    default: HTTP404(req, res);  break;
  }
};


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

wsbroad.on('connection', (ws) =>
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

wsbroad.on('open', () =>
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


let HTTP404 = (req, res)=>
{
  res.statusCode = 404;
  res.statusMessage = 'Resourse not found';
  res.end('Resourse not found');
};


const server = http.createServer().listen(PORT, (v) =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)})
.on('request', http_handler);
