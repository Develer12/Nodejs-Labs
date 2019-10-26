var url = require("url");
const express = require('express');
const bodyParser = require('body-parser');
const xmlBodyParser = require('express-xml-bodyparser');


const app = express();
app.use(bodyParser.json());
app.use(xmlBodyParser({}));
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = 5000;
const HOST = 'localhost';
const server = app.listen(PORT, HOST, () =>
{
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});


app.get('/getinfo', (req, res) =>
{
    res.statusCode = '201';
    res.statusMessage = "Sended";
    res.send("Dada ya");

});

app.get('/xy', (req, res) =>
{
    res.send(req.query.x + ' ' + req.query.y);
});

app.post('/xys', (req, res) =>
{
    res.end(req.query.x + ' ' + req.query.y + ' ' + req.query.s);
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
    console.log("Post JSON");
    let
    {
      _comment: comment,
      x: x,
      y: y,
      s: message,
      m: array,
      o: name
    } = req.body;
    res.json(
    {
        _comment: 'Response. ' + comment,
        x_plus_y: x + y,
        concat_s_o: message + ': ' + name.surname + ' ' + name.name,
        length_m: array.length
    });
});

app.post('/png', (req, res) =>
{

});

app.post('/txt', (req, res) =>
{
    res.setHeader('Content-Type', 'text/plain');
    let txt = req.body;
    console.log(txt);
    res.send(txt);
});

app.get('/getfile', (req, res) =>
{

});
