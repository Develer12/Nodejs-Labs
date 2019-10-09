const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const HOST = 'localhost';
const PORT = 5000;
const app = express();

app.use(bodyParser.json());

let HTTP404 = (req, res) =>
{
    console.log('${req.method}: ${req.url}, HTTP status 404');
    res.writeHead(404, {'Content-Type' : 'application/json; charset=utf-8'});
    res.end('{"error" : "${req.method}: ${req.url}, HTTP status 404"}');
}

let Get_handler = (req, res) =>
{
    switch (req.url)
    {
      case '/':     res.sendFile(__dirname + '/index.html'); break;
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
          res.writeHead(200, {'Content-Type' : 'application/docx; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.docx'));
          break;
      }
      case '/file/f.css':
      {
          console.log('Get CSS');
          res.writeHead(200, {'Content-Type' : 'application/css; charset=utf-8'});
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
          console.log('Get js');
          res.writeHead(200, {'Content-Type' : 'application/js; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.js'));
          break;
      }
      case '/file/f.xml':
      {
          console.log('Get Word');
          res.writeHead(200, {'Content-Type' : 'application/xml; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.xml'));
          break;
      }
      case '/file/f.json':
      {
          console.log('Get Word');
          res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.json'));
          break;
      }
      case '/file/f.mp4':
      {
          console.log('Get Word');
          res.writeHead(200, {'Content-Type' : 'video/mp4; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.mp4'));
          break;
      }
      default:break;

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

app.listen(PORT, HOST, () =>
{
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
}).on('request', http_handler);
