const http = require('http');
var url = require("url");
const server = http.createServer;
let fs = require('fs');
var state = '<h1>Started<h1>';

let factorial = (n) => {return (n < 2?n:n*factorial(n-1));}

function Fact(n, cb) {
    this.fn = n;
    this.ffact = factorial;
    this.fcb = cb;
    this.calc = ()=>{process.nextTick(()=>{this.fcb(null, this.ffact(this.fn));});}
}

function Fact1(n, cb) {
    this.fn = n;
    this.ffact = factorial;
    this.fcb = cb;
    this.calc = ()=>{process.setImmediate(()=>{this.fcb(null, this.ffact(this.fn));});}
}

server((req,res)=>
{
  switch (req.url)
  {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(state);
      break;
    case '/fac3':
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(fs.readFileSync('Lab3/index.html'));
      break;
    default:
      url.parse(req.url).pathname === '/fact';
      if (typeof url.parse(req.url, true).query.k != 'undefined')
      {
          let k = parseInt(url.parse(req.url, true).query.k);
          if (Number.isInteger(k))
          {
              res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify({ k:k, fact: factorial(k)}));
          }
      }
      else if (url.parse(req.url).pathname === '/facti')
      {
          console.log(req.url);
          if (typeof url.parse(req.url, true).query.k != 'undefined' ){
              let k = parseInt(url.parse(req.url, true).query.k);
                if (Number.isInteger(k))
                {
                  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                  let fact = new Fact(k, (err, result)=>{res.end(JSON.stringify({ k:k, factorial: result }));});
                  fact.calc();
                }
          }
      }
      else if (url.parse(req.url).pathname === '/facto')
      {
          console.log(req.url);
          if (typeof url.parse(req.url, true).query.k != 'undefined' ){
              let k = parseInt(url.parse(req.url, true).query.k);
                if (Number.isInteger(k))
                {
                  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                  let fact = new Fact1(k, (err, result)=>{res.end(JSON.stringify({ k:k, factorial: result }));});
                  fact.calc();
                }
          }
      }
      else
      {
        res.write("Page not found");
        res.end;
      }
  }
}).listen(5000, 'localhost', ()=>{console.log('Server start at 5000 port');
});


process.stdin.setEncoding('utf-8');
process.stdin.on('readable', ()=>
{
  let chunk = null;
  while ((chunk = process.stdin.read()) != null)
  {
    if (chunk.trim() == 'exit') process.exit(0);
    else if (chunk.trim() == 'norm' || chunk.trim() == 'test' || chunk.trim() == 'stop' || chunk.trim() == 'idle')
    {
      state = '<h1>' + chunk.trim().toUpperCase() + '<h1>';
      process.stdout.write('->' + chunk.trim() + '\n');
    }
    else process.stdout.write('Unknow comand: ' + chunk.trim() + '\n');
  }
});
