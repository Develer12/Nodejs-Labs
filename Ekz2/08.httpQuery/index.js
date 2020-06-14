let http = require('http');
let url = require('url');

let handler = (req, res)=>{
    if (req.method = 'GET'){
        let p = url.parse(req.url, true);
        let result = '';
        let q = url.parse(req.url, true).query;

        result = 
                `path: ${p.path}<br/>` +
                `pathname: ${p.pathname}<br/>` +
                `search: ${p.search}<br/>`;
        for(key in q) {result += `${key} = ${q[key]}<br/>`;}

        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.end(result);
    }
}

http.createServer().listen(3000)
.on('error', (e)=>{console.log('error: ', e.code)})
.on('request', handler);
