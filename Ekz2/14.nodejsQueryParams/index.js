var http = require("http");
var url = require("url");

http.createServer((req, res) => {
    if (req.method == "GET") {
        res.statusCode = 200;
        res.end(url.parse(req.url, true).query.x + " " + url.parse(req.url, true).query.y);
    }
}).listen(3000);