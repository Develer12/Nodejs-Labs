const express = require('express');
var bodyParser = require('body-parser')
const Db = require('./queries');
const DB = new Db();

const PORT = 3000;
const HOST = 'localhost';

const app = express();
app.use(bodyParser.json());
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

app.get('/api/:tab', (req, res) =>
{
    let tab = req.params.tab;
    console.log(`Get ${tab}`);
    DB.GetTab(tab).then(records => res.json(records))
      .catch(error =>
      {
      res.statusCode = 400;
      res.json({error: String(error)});
      });
});

app.post('/api/:tab', (req, res) =>
{
    let tab = req.params.tab;
    console.log(`Post ${tab}`);
    DB.InsertField(tab, req.body)
      .then(record => res.json(record))
      .catch(error =>
      {
        res.statusCode = 400;
        res.json({error: String(error)});
      });
});

app.put('/api/:tab', (req, res) =>
{
    let tab = req.params.tab;
    console.log(`Put ${tab}`);
    let id = req.body._id;
    delete req.body._id;
    console.log('put ', id);
    DB.UpdateField(tab, id, req.body)
      .then(record => res.json(record))
      .catch(error =>
      {
        res.statusCode = 400;
        res.json({error: String(error)});
      });
});

app.delete('/api/:tab/:id', (req, res) =>
{
    let tab = req.params.tab;
    console.log(`Delete ${tab}`);
    DB.DeleteField(tab, req.params.id)
      .then(record => res.json(record))
      .catch(error =>
      {
        res.statusCode = 400;
        res.json({error: String(error)});
      });
});
