let http = require('http');
let url = require('url');

let handler = (req, res)=>{
    if (req.method = 'GET'){
        let p = url.parse(req.url, true);
        let result = '';
        result = `path: ${p.pathname}<br/>`;
        decodeURI(p.pathname).split('/').forEach(e => {result += `${e}<br/>`});
        console.log(p.pathname.split('/'));
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.end(result);
    }
}

http.createServer().listen(3000)
.on('error', (e)=>{console.log('error: ', e.code)})
.on('request', handler);
