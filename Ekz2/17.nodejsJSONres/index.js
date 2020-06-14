let http = require("http");
let url = require("url");

http.createServer((req, res) => {
    if (req.method == "POST") {
        res.statusCode = 200;
        let data = "";
        req.on("data", (chunk) => {
            data += chunk.toString("utf-8")
        });
        req.on("end", () => {
            console.log(JSON.parse(data));
            res.end(data)
        });
    }
}).listen(3000);