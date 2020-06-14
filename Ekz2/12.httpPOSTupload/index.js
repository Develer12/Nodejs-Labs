let http = require('http');
let fs = require('fs');

let handler = (req, res)=>{
    if(req.method == 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(fs.readFileSync('./index.html'));
    }
    else if (req.method == 'POST') {
        let result = '';
        req.on('data', data => {result += data;});
        req.on('end', () => {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write('<H1>Uploaded</H1>');
            res.end(result);
        });
    }
}

http.createServer().listen(3000)
.on('error', (e)=>{console.log('error: ', e.code)})
.on('request', handler);
