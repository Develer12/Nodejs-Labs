const express = require('express');
const API = require('./Handlers/Api_Handler');

const app = express();

const PORT = 3000;
const HOST = 'localhost';


app.get('/', (req, res) =>
{
    console.log('Send html');
});

app.get('/api/:tab', (req, res) =>
{
    let tab = req.params.tab;
    API.get(tab, req, res);
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
app.post('/api/:tab', (req, res) =>
{
    let tab = req.params.tab;
    API.post(tab, req, res);
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
app.put('/api/:tab', (req, res) =>
{
    let tab = req.params.tab;
    API.put(tab, req, res);
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
app.delete('/api/:tab/:code', (req, res) =>
{
    let tab = req.params.tab;
    let code = req.params.code;
    API.delete(tab, code, req, res)
});

app.listen(PORT, () =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});
