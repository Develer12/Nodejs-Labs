let http = require("http");
let fs = require("fs");

let options = {
    host: 'localhost',
    path: '/',
    port: 3000,
    method: 'POST',
    headers: { 'content-type': 'multipart/form-data;' }
};

let req = http.request(options)
.on("error", (e)=>{console.log("error: ", e.message);});
req.end(fs.readFileSync('./file.txt'));
