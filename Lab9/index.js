var url = require("url");
const express = require('express');

const app = express();

const PORT = 5000;
const HOST = 'localhost';

app.get('/getinfo', (req, res) => {
    res.statusCode = '201';
    res.statusMessage = "Current password does not match";
    res.json({data: "Dada ya"});

});

const server = app.listen(PORT, HOST, () => {
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
}).on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});
