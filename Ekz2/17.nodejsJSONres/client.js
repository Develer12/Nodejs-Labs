var http = require("http");

var options = {
    host: "localhost",
    path: "/",
    port: 3000,
    method: "POST",
    headers: {"Content-Type": "application/json"}
}
const req = http.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
        data += chunk.toString("utf-8")
    });
    res.on("end", () => {
        console.log(JSON.parse(data));
    });
});
req.on("error", (e)=>{console.log("error: ", e.message);});
req.end(JSON.stringify({
    x: 1,
    y: 'da'
}));