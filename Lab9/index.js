var url = require("url");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const PORT = 5000;
const HOST = 'localhost';

app.get('/getinfo', (req, res) =>
{
    res.statusCode = '201';
    res.statusMessage = "Sended";
    res.json({data: "Dada ya"});

});

app.get('/xy', (req, res) =>
{
    res.json({result: 'success: ' + req.query.x + req.query.y});
});

app.post('/xys', (req, res) =>
{
    res.json({result: req.body.s + ': ' + req.body.x + req.body.y});
});

app.post('/xml', (req, res) =>
{
    let xml = req.body;
    res.setHeader('Content-Type', 'text/xml');
    let sum = 0;
    let text = '';
    xml.req.x.forEach(x => sum += Number(x.$.value));
    xml.req.m.forEach(m => text += m.$.value);
    let responseText = `
        <res="${xml.req.$.id}">
        <sum element="x" result="${sum}"></sum>
        <text element="m" result="${text}"></text>
        </res>`;
    res.end(responseText);
});

app.post('/json', (req, res) =>
{

});

app.post('/png', (req, res) =>
{

});

app.post('/txt', (req, res) =>
{

});

app.get('/getfile', (req, res) =>
{

});

const server = app.listen(PORT, HOST, () =>
{
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});
