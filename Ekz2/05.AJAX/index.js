let http = require('http');
let fs = require('fs');

let http_handler = (req, res)=>{
    if (req.url==='/hi'){
        res.writeHead(200, {'content-Type': 'text/plain; charset=utf-8'});
        res.end('Hello');
    }
    if (req.url==='/f'){
        let html = fs.readFileSync('./fetch.html');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(html);
    }
    if (req.url==='/x'){
        let html = fs.readFileSync('./xhr.html');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(html);
    }
};

http.createServer()
.listen(5000)
.on('request', http_handler);