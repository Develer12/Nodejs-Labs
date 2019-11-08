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
    let cur = new Date();
    let date = addZero(cur.getFullYear())+addZero(cur.getMonth())+
               addZero(cur.getDate())+addZero(cur.getHours())+
               addZero(cur.getMinutes())+addZero(cur.getSeconds());
    function addZero(n)
    {
      return (n < 10 ? '0' : '') + n;
    }
    setTimeout(() =>
      fs.writeFile((__dirname + '/backups/'+date+'_StudentList.json'), JSON.stringify(ST, null, '  '), () => {}),
      2000);
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

app.delete('/backup/:yyyyddmm', (req, res) =>
{
    let date = req.params.yyyyddmm;
    fs.readdir(__dirname + '/backups', (err, files) =>
    {
        if (err)
        {
            res.statusCode = 500;
            res.json({error: err.message});
            throw err;
        }

        let BackupDate = dateSlice(date);

        files.forEach(file =>
        {
            console.log(BackupDate+' '+fBackupDate);
            if (BackupDate > fBackupDate)
            {
                fs.unlink(__dirname + '/backups/' + file, err =>
                {
                    if (err)
                    {
                        res.statusCode = 500;
                        res.body = JSON.stringify({error: err.message});
                        throw err;
                    }
                })
            }
        });
        res.end();
    });

});

function dateSlice(date)
{
    let year = '', month = '', day = '';
    let hour = '', minute = '', second = '';

    for (let i = 0; i < date.length; i++)
    {
        if (i < 4)
            year += date.charAt(i);
        else if (i < 6)
            month += date.charAt(i);
        else if (i < 8)
            day += date.charAt(i);
        else if (i < 10)
            hour += date.charAt(i);
        else if (i < 12)
            minute += date.charAt(i);
        else if (i < 14)
            second += date.charAt(i);
    }

    let arr = [year, month, day, hour, minute, second];
    let fdate = new Date(Number(arr[0]), Number(arr[1]), Number(arr[2]),
                          Number(arr[3]), Number(arr[4]), Number(arr[5]));
    return fdate;
}
