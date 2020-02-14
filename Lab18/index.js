const express = require('express');
const API = require('./Handlers/Api_Handler');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const HOST = 'localhost';


app.get('/', (req, res) =>
{
    console.log('Send html');
    res.sendFile(__dirname + '/index.html');
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

//-----PUT------
app.put('/api/:tab', (req, res) =>
{
    let tab = req.params.tab;
    API.put(tab, req, res);
});

//-----DELETE------
app.delete('/api/:tab', (req, res) =>
{
    let tab = req.params.tab;
    API.delete(tab, req, res)
});

app.listen(PORT, () =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});
