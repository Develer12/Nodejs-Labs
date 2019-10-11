const http = require('http');
const fs = require('fs');
var url = require("url");

const PORT = 5000;
let server = http.createServer();
server.KeepAliveTimeout = 10000;

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

let Get_handler = (req, res) =>
{
    switch (req.url)
    {
      case '/file/f.png':
      {
          console.log('Get PNG');
          res.writeHead(200, {'Content-Type' : 'image/png; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.png'));
          break;
      }
      case '/file/f.docx':
      {
          console.log('Get Word');
          res.writeHead(200, {'Content-Type' : 'application/msword; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.docx'));
          break;
      }
      case '/file/f.css':
      {
          console.log('Get CSS');
          res.writeHead(200, {'Content-Type' : 'text/css; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.css'));
          break;
      }
      case '/file/f.html':
      {
          console.log('Get HTML');
          res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.html'));
          break;
      }
      case '/file/f.js':
      {
          console.log('Get JS');
          res.writeHead(200, {'Content-Type' : 'text/javascript; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.js'));
          break;
      }
      case '/file/f.xml':
      {
          console.log('Get XML');
          res.writeHead(200, {'Content-Type' : 'application/xml; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.xml'));
          break;
      }
      case '/file/f.json':
      {
          console.log('Get JSON');
          res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.json'));
          break;
      }
      case '/file/f.mp4':
      {
          console.log('Get MP4');
          res.writeHead(200, {'Content-Type' : 'video/mp4; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.mp4'));
          break;
      }
      default:
          if (url.parse(req.url).pathname === '/connection')
          {
              let set = parseInt(url.parse(req.url, true).query.set);
              if (Number.isInteger(set))
              {
                  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                  server.KeepAliveTimeout = set;
                  res.end(`KeepAliveTimeout = ${server.KeepAliveTimeout}`);
              }
              else
              {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(`KeepAliveTimeout = ${server.KeepAliveTimeout}`);
              }
          }
          else if (url.parse(req.url).pathname === '/headers')
          {

          }
          else if (url.parse(req.url).pathname === '/close')
          {

          }
          else if (url.parse(req.url).pathname === '/socket')
          {
            server.on('connection', (socket) =>
              {
                console.log('Get socket');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                res.end(`<h1>LocalAdress</h1>`);
              });
          }
          else if (url.parse(req.url).pathname === '/req-data')
          {

          }
          else if (url.parse(req.url).pathname === '/formparameter')
          {

          }
          else if (url.parse(req.url).pathname === '/json')
          {

          }
          else if (url.parse(req.url).pathname === '/upload')
          {

          }
          else if (url.parse(req.url).pathname === '/files')
          {

          }

          else HTTP405(req, res); break;

    }
}

let http_handler = (req, res) =>
{
    switch (req.method)
    {
      case 'GET': Get_handler(req, res); break;
      default: HTTP404(req, res); break;
    }
}

server.listen(PORT, () =>
{
    const URL = `http://localhost:${PORT}`;
    console.log('Listening on ' + URL);
})
  .on('error', (e) => {console.log(`${URL} | error: ${e.code}`)})
  .on('request', http_handler);
