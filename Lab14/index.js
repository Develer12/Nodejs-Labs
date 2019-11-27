const sql = require('mssql');
const express = require('express');
var bodyParser = require('body-parser')
const Db = require('./queries');
const DB = new Db();

const PORT = 3000;
const HOST = 'localhost';

const app = express();
app.use(bodyParser.json())
const server = app.listen(PORT, HOST, () =>
{
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});



//-----GET------
app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/faculties', (req, res) =>
{
    console.log('Get faculties');
    getHand('FACULTY', req, res);
});

app.get('/api/pulpits', (req, res) =>
{
    console.log('Get pulpits');
    getHand('PULPIT', req, res);
});

app.get('/api/subjects', (req, res) =>
{
    console.log('Get subjects');
    getHand('SUBJECT', req, res);
});

app.get('/api/auditortype', (req, res) =>
{
    console.log('Get Auditorium Type');
    getHand('AUDITORIUM_TYPE', req, res);
});

app.get('/api/auditor', (req, res) =>
{
    console.log('Get Auditorium');
    getHand('AUDITORIUM', req, res);
});

function getHand(tab, req, res)
{
    DB.Get(tab).then(records =>
    {res.json(records.recordset);}).catch(error =>
        {
            res.statusCode = 400;
            res.json({error: String(error)});
        });
}

//-----POST------
app.post('/api/faculties', (req, res) =>
{
    console.log('Get faculties');
    postHand('FACULTY', req, res);
});

app.post('/api/pulpits', (req, res) =>
{
    console.log('Get pulpits');
    postHand('PULPIT', req, res);
});

app.post('/api/subjects', (req, res) =>
{
    console.log('Get subjects');
    postHand('SUBJECT', req, res);
});

app.post('/api/auditortype', (req, res) =>
{
    console.log('Get Auditorium Type');
    postHand('AUDITORIUM_TYPE', req, res);
});

app.post('/api/auditor', (req, res) =>
{
    console.log('Get Auditorium');
    postHand('AUDITORIUM', req, res);
});

function postHand()
{
    DB.Insert(object, req.body).then(record =>
    {res.json(record.recordset[0]);}).catch(error =>
    {
        res.statusCode = 400;
        res.json({error: String(error)});
    });
}

//-----PUT------
app.put('/api/faculties', (req, res) =>
{
    console.log('Get faculties');
    putHand('FACULTY', req, res);
});

app.put('/api/pulpits', (req, res) =>
{
    console.log('Get pulpits');
    putHand('PULPIT', req, res);
});

app.put('/api/subjects', (req, res) =>
{
    console.log('Get subjects');
    putHand('SUBJECT', req, res);
});

app.put('/api/auditortype', (req, res) =>
{
    console.log('Get Auditorium Type');
    putHand('AUDITORIUM_TYPE', req, res);
});

app.put('/api/auditor', (req, res) =>
{
    console.log('Get Auditorium');
    putHand('AUDITORIUM', req, res);
});

function putHand()
{
    DB.Update(object, req.body).then(record =>
    {res.json(record.recordset[0]);}).catch(error =>
    {
        res.statusCode = 400;
        res.json({error: String(error)});
    });
}

//-----DELETE------
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
