var http = require('http');

let urlhandler = (req, res)=>{
    if(req.url == '/404'){
        HTTP404(req, res);
    }
    else{
        res.writeHead(200);
        res.end(`${req.method}:${req.url}`);
    }
}

let HTTP405 = (req, res)=>{
    res.writeHead(405);
    res.end(`Wrong METHOD`);
};

let HTTP404 = (req, res)=>{
    res.writeHead(404);
    res.end(`Wrong URI`);
};

let http_handler = (req, res)=>{
    switch (req.method) {
        case 'GET': urlhandler(req,res); break;
        case 'POST': urlhandler(req,res); break;
        case 'PUT': urlhandler(req,res); break;
        case 'DELETE': urlhandler(req,res); break;
        default: HTTP405(req, res); break;
    }
};

http.createServer().listen(3000)
.on('error', (e)=>{console.log('error: ', e.code)})
.on('request', http_handler);
