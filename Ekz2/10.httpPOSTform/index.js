let http = require('http');
let url = require('url');
let qs = require('querystring');
let fs = require('fs');

let handler = (req, res)=>{
    if (req.method == 'GET'){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.end(fs.readFileSync('./index.html'));
    }
    else if (req.method == 'POST'){
        let result = '';
        req.on('data', (data)=>{result+=data;})
        req.on('end', ()=>{
            result += '<br/>';
            let o = qs.parse(result);
            for(let key in o) {result += `${key} = ${o[key]}<br/>`}
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
            res.end(result);
        });
    }
}

http.createServer().listen(3000)
.on('error', (e)=>{console.log('error: ', e.code)})
.on('request', handler);
