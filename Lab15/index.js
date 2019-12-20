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
    console.log(`Get ${req.params.tab}`);
    DB.GetPulp(req.params.tab).then(records => res.json(records))
      .catch(error =>
      {
      res.statusCode = 400;
      res.json({error: String(error)});
      });
});
