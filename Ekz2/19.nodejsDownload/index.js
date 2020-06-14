let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
    res.statusCode = 200;
    let body = fs.readFileSync("./file.txt");
    res.end(body);
}).listen(3000);