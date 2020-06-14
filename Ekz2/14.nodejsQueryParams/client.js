var http = require("http");
var query = require("querystring");

var params = query.stringify({x:8, y:4});
var path = `/?${params}`;

var options = {
    host: "localhost",
    path: path,
    port: 3000,
    method: "GET"
};
const req = http.request(options, (res) => {
    let data = "";
    res.on("data", (chunk)=>{
        data += chunk.toString("utf-8")    
    });
    res.on("end", ()=>{console.log("end: ", data);});
});

req.on("error", (e)=>{console.log("error: ", e.message);});
req.end();