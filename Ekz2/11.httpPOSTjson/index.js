let http = require('http');

let handler = (req, res)=>{
    if (req.method == 'POST'){
        let result = '';
        req.on('data', (data)=>{result+=data.toString();})
        req.on('end', ()=>{
            try{
                console.log(result)
                result = JSON.parse(result);
                res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                res.end(JSON.stringify({result: result}));
            }
            catch{
                res.end('not json')
            }
        });
    }
}

http.createServer().listen(3000)
.on('error', (e)=>{console.log('error: ', e.code)})
.on('request', handler);
