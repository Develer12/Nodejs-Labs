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
             res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
             res.end(`<h1>Server will be closed after 10 sec.</h1>`);
             console.log("Server will be closed after 10 sec");
             setTimeout(() => server.close(() => console.log("Server closed")), 10000);
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
            console.log('Get Upload');
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
            res.end(fs.readFileSync(__dirname + "/Update.html"));
          }
          else if (url.parse(req.url).pathname === '/files')
          {

          }
          else if (url.parse(req.url).pathname.includes('/files/'))
          {
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
          }

          else HTTP405(req, res); break;

    }
}

let Post_handler = (req, res) =>
{
    let result = '';
    let fname = 't.txt';
    req.on('data', (data)=>{result+=data;});
    fname = req.text;
    req.on('end', () =>
    {
        console.log('File Upload');
        console.log('File ' + fname);

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.write(`<h1>File Upload</h1>`);
        res.end(result);
        fs.writeFile(__dirname +'/files/' + fname, result, (err) =>
        {
            if (err) throw err;
              console.log('The file has been saved!');
        });
    });
}

let http_handler = (req, res) =>
{
    switch (req.method)
    {
      case 'GET': Get_handler(req, res); break;
      case 'POST': Post_handler(req, res); break;
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
