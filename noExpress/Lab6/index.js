const http = require('http');
var mod = require('./m0603');
const fs = require('fs');

const HOST = 'localhost';
const PORT = 5000;

async function mail()
{
  async (req, res) => {
      let newObject = {
        name: req.query.name,
        birth: req.query.birth
      } = req.body;
      console.log("Info about Emails get");
  }
}

let http_handler = (req, res)=>
{
  switch (req.method)
  {
    case 'GET': GET_handler(req, res);  break;
    case 'POST': POST_handler(req, res);  break;
    default: HTTP404(req, res);  break;
  }
};

let GET_handler = (req, res)=>
{
  switch (req.url)
  {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(fs.readFileSync(__dirname + '/index.html'));
      console.log("App sendFile");
    break;
    default: HTTP404(req, res);  break;
  }
};

let POST_handler = (req, res)=>
{
  switch (req.url)
  {
    case '/sendMS':
      console.log("Sending Start");
      let body = ' ';
      req.on('data', chunk => {
            body = chunk.toString();
            body = JSON.parse(body);
        });
      req.on('end', async () => { mod.Send(body).catch(console.error);});
    break;
    default: HTTP404(req, res);  break;
  }
};

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
