let http = require('http');
let fs = require('fs');

let handler = (req, res) => {
    console.log('start')
    req.on('data', (chunk) => {
        console.log(chunk.toString('utf-8'));
    });
}

http.createServer().listen(3000)
.on('request', handler);