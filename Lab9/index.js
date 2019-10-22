var url = require("url");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const PORT = 5000;
const HOST = 'localhost';

app.get('/getinfo', (req, res) => {
    res.statusCode = '201';
    res.statusMessage = "Sended";
    res.json({data: "Dada ya"});

});

app.get('/xy', (req, res) => {
    res.json({result: 'success: ' + req.query.x + req.query.y});
});

app.post('/xys', (req, res) => {
    res.json({result: req.body.s + ': ' + req.body.x + req.body.y});
});

const server = app.listen(PORT, HOST, () => {
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
}).on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});
