let http = require("http");

let options = {
    host: "localhost",
    path: "/",
    port: 3000,
    method: "GET",
    headers: {
        "Content-Type": 'multipart/form-data'
    }
}
http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk)=>{
        data += chunk.toString("utf-8");
    });
    res.on("end", ()=>{
        console.log("body: ", data);
    });
})
.on("error", (e)=>{console.log("error: ", e.message);})
.end();