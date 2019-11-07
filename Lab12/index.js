const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const ST = require('./StudentList');


const app = express();
app.use(bodyParser.json());


const fdir = __dirname + '/StudentList.json';
const PORT = 5000;
const HOST = 'localhost';
const server = app.listen(PORT, HOST, () =>
{
  const URL = `http://${HOST}:${PORT}`;
  console.log('Listening on ' + URL);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});



app.get('/', (req, res) =>
{
    res.json(ST);
});

app.get('/:n', (req, res) =>
{
    let n = req.params.n;
    let index = ST.findIndex(s => s.id == n);
    if(index)
    {
      let st = ST[index];
      res.json(st);
    }
    else
    {
      res.statusCode = 404;
      res.end();
    }
});

app.get('/backup', (req, res) =>
{

});


app.post('/', (req, res) =>
{
    let
    {
        id: id,
        name: name,
        birth: birth,
        speciality: speciality
    } = req.body;
    if (ST.find(s => s.id == id))
    {
        res.statusCode = 400;
        res.json({error: 'Student with this ID is already exists'});
    }
    else
    {
        let student = {id: id, name: name, birth: birth, speciality: speciality};
        ST.push(student);
        fs.writeFile(fdir, JSON.stringify(ST, null, '  '), () => {});
        res.json(student);
    }
});

app.post('/backup', (req, res) =>
{

});


app.put('/', (req, res) =>
{
    let
    {
      id: id,
      name: name,
      birth: birth,
      speciality: speciality
    } = req.body;
    let index = ST.findIndex(s => s.id == id);
    if (ST !== -1)
    {
      let stNew = {id: id, name: name, birth: birth, speciality: speciality};
      let stOld = ST[index];
      Object.keys(stOld).forEach(n =>
      {
          if (stNew[n] && stOld[n] !== stNew[n])
              stOld[n] = stNew[n];
      });
      fs.writeFile(fdir, JSON.stringify(ST, null, '  '), () => {});
      res.json(stOld);
    }
    else
    {
      res.statusCode = 401;
      res.json({error: 'Student with current id not founded'});
    }
});


app.delete('/:n', (req, res) =>
{
    let n = req.params.n;
    let index = ST.findIndex(s => s.id == n);
    if(index)
    {
      ST.splice(ST.findIndex(s => s.id == n), 1);
      fs.writeFile(fdir, JSON.stringify(ST, null, '  '), () => {});
      res.json(index);
    }
    else
    {
      res.statusCode = 404;
      res.end();
    }
});

app.delete('/backup/', (req, res) =>
{

});
