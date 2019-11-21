const sql = require('mssql');
const express = require('express');
var bodyParser = require('body-parser')
const que = require('./que');


const PORT = 3000;
const HOST = 'localhost';
let config = {user: 'DESKTOP-U4BLHC6', password: '', server: 'localhost', database: 'Nodejs'};


const app = express();
app.use(bodyParser.json())
const server = app.listen(PORT, HOST, () =>
{
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});


app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/faculties', (req, res) =>
{

});

app.get('/api/pulpits', (req, res) =>
{

});

app.get('/api/subjects', (req, res) =>
{

});

app.get('/api/auditortype', (req, res) =>
{

});

app.get('/api/auditor', (req, res) =>
{

});

app.post('/api/faculties', (req, res) =>
{

});

app.post('/api/pulpits', (req, res) =>
{

});

app.post('/api/subjects', (req, res) =>
{

});

app.post('/api/auditortype', (req, res) =>
{

});

app.post('/api/auditor', (req, res) =>
{

});

app.put('/api/faculties', (req, res) =>
{

});

app.put('/api/pulpits', (req, res) =>
{

});

app.put('/api/subjects', (req, res) =>
{

});

app.put('/api/auditortype', (req, res) =>
{

});

app.put('/api/auditor', (req, res) =>
{

});

app.delete('/api/faculties/:xy', (req, res) =>
{
    let xy = req.params.xy;
});

app.delete('/api/pulpits/:xy', (req, res) =>
{
    let xy = req.params.xy;
});

app.delete('/api/subjects/:xy', (req, res) =>
{
    let xy = req.params.xy;
});

app.delete('/api/auditortype/:xy', (req, res) =>
{
    let xy = req.params.xy;
});

app.delete('/api/auditor/:xy', (req, res) =>
{
    let xy = req.params.xy;
});

app.get('/drop', (req, res) =>
{

});

app.get('/create', (req, res) =>
{

});
