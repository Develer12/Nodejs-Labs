const fs = require('fs');
var url = require("url");
const http = require('http');


const PORT = 5000;
const HOST = 'localhost';

let HTTP404 = (req, res) =>
{
    console.log(`${req.method}: ${req.url}, HTTP status 404`);
    res.writeHead(404, {'Content-Type' : 'application/json; charset=utf-8'});
    res.end(`"error" : "${req.method}: ${req.url}, HTTP status 404"`);
}

let HTTP405 = (req, res) =>
{
    console.log(`${req.method}: ${req.url}, HTTP status 405`);
    res.writeHead(404, {'Content-Type' : 'application/json; charset=utf-8'});
    res.end(`Error" : "${req.method}: ${req.url}, HTTP status 405"`);
}

let http_handler = (req, res)=>
{
  switch (req.method)
  {
    case 'GET': GET_handler(req, res);  break;
    case 'POST': POST_handler(req, res);  break;
    default: HTTP405(req, res);  break;
  }
};

let GET_handler = (req, res)=>
{
  switch (req.url)
  {
    case '/connection':
      let set = parseInt(url.parse(req.url, true).query.set);
      if (Number.isInteger(set))
      {
          console.log('Set connection');
          res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
          app.KeepAliveTimeout = set;
          res.end(`KeepAliveTimeout = ${app.KeepAliveTimeout}`);
      }
      else
      {
        console.log('Get connection');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`KeepAliveTimeout = ${app.KeepAliveTimeout}`);
      }
    break;
    case '/close':
      res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
      res.end(`<h1>Server will be closed after 10 sec.</h1>`);
      console.log("Server will be closed after 10 sec");
      setTimeout(() => server.close(() => console.log("Server closed")), 1000);
    break;
    case '/headers':
      console.log('Get headers');
      res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
      for(key in req.headers)
        res.write(`<h3>request: ${key}: ${req.headers[key]}</h3>`);
      for(key in res.getHeaders())
        res.write(`<h3>response: ${key}: ${res.getHeaders[key]}</h3>`);
    break;
    case '/socket':
      server.on('connection', (socket) =>
      {
        console.log('Get socket');
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.write(`<h3>LocalAddress = ${socket.localAddress}</h3>`);
        res.write(`<h3>LocalPort = ${socket.localPort}</h3>`);
        res.write(`<h3>RemoteAddress = ${socket.remoteAddress}</h3>`);
        res.write(`<h3>RemoteFamily = ${socket.remoteFamily}</h3>`);
        res.write(`<h3>RemotePort = ${socket.remotePort}</h3>`);
        res.end(`<h3>BytesWritten = ${socket.bytesWritten}</h3>`);
      });
    break;
    case '/req-data':
      let data = [];
      req.on('data', chunk => data.push(chunk));
      req.on('end', () =>
      {
        console.log(data);
        res.end();
      });
    break;
    case '/req-status':
      res.statusCode = req.query.code;
      res.statusMessage = req.query.mess;
      res.end();
    break;
    case '/formparameter':
      res.sendFile(__dirname + '/files/Formparameter.html');
    break;
    case '/parameter':
      let x = Number(req.query.x);
      let y = Number(req.query.y);
      parameterHandler(x, y, res);
    break;
    case '/parameter/:x/:y':
      let x = Number(req.params.x);
      let y = Number(req.params.y);
      parameterHandler(x, y, res);
    break;
    case '/upload':
      console.log('Get Upload');
      res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
      res.end(fs.readFileSync(__dirname + "/Update.html"));
    break;
    case '/files':
      if (url.parse(req.url).pathname === '/files')
      {
        console.log('Get files count');
        fs.readdir( __dirname + '/files', (err, files) =>
        {
          if (err) res.statusCode = 500;
          res.setHeader('X-static-files-count', files.length);
          res.end();
        });
      }
    break;
    case '/upload':
      fname = url.parse(req.url).pathname;
      if(!fs.existsSync(__dirname + fname))
        HTTP404(req, res);
      else
      {
        console.log('Get file name');
        res.writeHead(200, {'Content-Type' : 'text/palin; charset=utf-8'});
        res.end(fs.readFileSync(__dirname + fname));
      }
    break;
    default: HTTP404(req, res);  break;
  }
};

let POST_handler = (req, res)=>
{
  switch (req.url)
  {
    case '/formparameter':
      console.log(JSON.stringify(req.body));
      res.json(req.body);
    break;
    case '/xml':
      let xml = req.body;
      console.log(JSON.stringify(xml));
      res.setHeader('Content-Type', 'application/xml');
      let sum = 0;
      let text = '';
      xml.req.x.forEach(x => sum += Number(x.$.value));
      xml.req.m.forEach(m => text += m.$.value);
      let responseText = `
          <res="${xml.req.$.id}">
          <sum element="x" result="${sum}"></sum>
          <text element="m" result="${text}"></text>
          </res>`;
      res.end(responseText);
    break;
    case '/json':
      console.log("Post JSON");
      let
      {
        _comment: comment,
        x: x,
        y: y,
        s: message,
        m: array,
        o: name
      } = req.body;
      res.json(
      {
          _comment: 'Response. ' + comment,
          x_plus_y: x + y,
          concat_s_o: message + ': ' + name.surname + ' ' + name.name,
          length_m: array.length
      });
    break;
    case '/upload':
      let result = '';
      let fname = '';
      let File = req.files.file;
      result+=File.data;
      res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
      res.write(`<h1>File Upload</h1>`);
      res.end(result);
      File.mv(__dirname + '/files/' + File.name, (err) =>
      {
          if (err) throw err;
          console.log('The file has been saved!');
      });
    break;
    default: HTTP404(req, res);  break;
  }
};

function parameterHandler(x, y, res)
{
    if (Number.isInteger(x) && Number.isInteger(y))
    {
        res.json(
          {
            add: x + y,
            sub: x - y,
            mult: x * y,
            div: x / y
        });
    }
    else
        res.json({message: 'Wrong data type'});
}


const server = http.createServer().listen(PORT, (v) =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)})
.on('request', http_handler);
