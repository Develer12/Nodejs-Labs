const app = require('express')();
const https = require('https');
const fs = require('fs');

const PORT = 3000;

let options = {
    key: fs.readFileSync(`${__dirname}/cerificates/LAB.key`).toString(),
    cert: fs.readFileSync(`${__dirname}/cerificates/LAB.crt`).toString()
};

app.get('/da', (req, res) => {
    console.log('da');
    res.send('da');
});
app.get('/', (req, res) => {
    console.log('da');
    res.send('da');
});

https.createServer(options, app).listen(PORT, () =>{
  console.log(`Listening on https://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
