let http = require('http');
let fs = require('fs');

writeHTTP404 = (req, res) => {
    res.statusCode = 404;
    res.statusMessage = 'Resourse not found';
    res.end("Resourse not found");
}
isStatic = (ext, fn) => {
    let reg = new RegExp(`^\/.+\.${ext}$`);
    return reg.test(fn);
};
sendFile = (req, res, headers) => {
    fs.access(`./static${req.url}`, err => {
        if (err)
            this.writeHTTP404(res);
        else{
            res.writeHead(200, headers);
            fs.createReadStream(`./static${req.url}`).pipe(res);
        }
    });
};


let http_handler = (req, res)=>{
    if (isStatic('html', req.url)) sendFile(req, res, { "Content-Type": "text/html; charset=utf-8;" });
    else if (isStatic('css', req.url)) sendFile(req, res, { "Content-Type": "text/css; charset=utf-8;" });
    else if (isStatic('js', req.url)) sendFile(req, res, { "Content-Type": "text/javascript; charset=utf-8;" });
    else if (isStatic('docx', req.url)) sendFile(req, res, { "Content-Type": "application/msword" });
    else if (isStatic('png', req.url)) sendFile(req, res, { "Content-Type": "image/png" });
    else writeHTTP404(req, res);
};

http.createServer().listen(3000)
.on('error', (e)=>{console.log('error: ', e.code)})
.on('request', http_handler);