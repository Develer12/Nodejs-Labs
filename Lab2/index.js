const http = require('http');
const server = http.createServer;
let fs = require('fs');

server((req,res)=>
{
  switch (req.url)
  {
    case '/':
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(fs.readFileSync('Lab2/index.html'));
      break;
    case '/png':
      res.writeHead(200, {'Content-Type' : 'image/png'});
      res.end(fs.readFileSync('Lab2/45.png'));
      break;
    case '/api/name':
      res.writeHead(200, {'Content-Type':'text/plain'});
      res.end(fs.readFileSync('Lab2/text.txt'));
      break;
    case '/xmlhttprequest':
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end(fs.readFileSync('Lab2/xmlhttprequest.html'));
      break;
    case '/jQuery':
      res.writeHead(200, {'Content-type': 'text/html'});
      res.write(fs.readFileSync('Lab2/jQuery.html'));
      res.end();
      break;
    case '/fetch':
      res.writeHead(200,{'Content-type': 'text/html'});
      res.write(fs.readFileSync('Lab2/fetch.html'));
      res.end();
      break;
    default:
      res.write("Page not found");
      res.end();

  }
}).listen(5000, 'localhost', ()=>{
  console.log('Server start at 5000 port');
});
