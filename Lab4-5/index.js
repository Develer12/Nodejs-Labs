const express = require('express');
const bodyParser = require('body-parser');
const DataBase = require('./db/DataBase');

const HOST = 'localhost';
const PORT = 5000;

const app = express();
const db = new DataBase(DataBase.names());

app.use(bodyParser.json());
app.use(express.static('.'));

db.on('get', async (request, response) => {
    await response.json(await db.getRows());
    console.log("DB get");
});
db.on('post', async (request, response) => {
    let newObject = {
        name: request.query.name,
        birth: request.query.birth
    } = request.body;
    await response.json(await db.addRow(newObject));
    console.log("DB post");
});
db.on('put', async (request, response) => {
    let object = {
        id: request.query.id,
        name: request.query.name,
        birth: request.query.birth
    } = request.body;
    await response.json(await db.updateRow(object));
    console.log("DB put");
});
db.on('delete', async (request, response) => {
    await response.json(await db.removeRow(request.query.id));
    console.log("DB delete");
});
db.on('commit', async (request, response) => {
    await response.json(await db.stCommit());
    console.log("DB commit");
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
    console.log("App sendFile");
});

app.get('/api/ss', (request, response) => {
  if(finish == 0)
  {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end('Сбор статистики еще не завершен');
  }
  else
  {
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    response.end(JSON.stringify({ Start: St1, Finish: finish, Commit: Comm, Statistic: Stat }));
  }
  console.log("Open statistic");

});

app.get('/commit', (request, response) => {
    db.emit('commit', request, response);
    console.log("App commit");
});

app.get('/api/db', (request, response) => {
    db.emit('get', request, response);
    console.log("App get");
});
app.post('/api/db', (request, response) => {
    db.emit('post', request, response);
    console.log("App post");
});
app.put('/api/db', (request, response) => {
    db.emit('put', request, response);
    console.log("App put");
});
app.delete('/api/db', (request, response) => {
    db.emit('delete', request, response);
    console.log("App delete");
});

app.listen(PORT, HOST, () => {
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
});

var timerId = 0;
var timerIdout = 0;
var Comm = 0;
var Stat = 0;
var start = 0;
var St1 = 0;
var finish = 0;
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', ()=>
{
  while ((chunk = process.stdin.read()) != null)
  {

    start = Date.now();
    var num = Number(chunk.trim().replace(/[^\d]/g, ''));
    if (chunk.trim().includes('sd'))
    {
      if(!num == '')
      {
        process.stdout.write('->process exit after ' + num + ' second\n');
      }
      else if(num == 0) num = '';
      clearTimeout(timerIdout);
      timerIdout = setTimeout(() => process.exit(0), num*1000);
      if(!num)
      {
        process.stdout.write('->Exit timer stoped\n');
      }
    }
    else if (chunk.trim().includes('sc'))
    {
      finish = 0;
      if(!num == '')
      {

        St1 = (new Date()).toString().substr(3, 21);
        Comm++;
        process.stdout.write('->commit every ' + num + ' second\n');
      }
      else if(num == 0) num = '';
      clearInterval(timerId);
      timerId = setInterval(() =>
      {
        app.get('/commit', (request, response) => db.emit('commit', (request, response)));
        Comm++;
        process.stdout.write('COMMIT\n');
      }, num * 1000);
      timerId.unref();
      if(!num)
      {
        clearInterval(timerId);
        process.stdout.write('->commit stoped\n');
        Comm--;
        finish = (new Date()).toString().substr(3, 21);
      }
    }
    else if (chunk.trim().includes('ss'))
    {
      finish = 0;
      if(!num == '' )
      {
        St1 = (new Date()).toString().substr(3, 21);
        Stat++;
        process.stdout.write('->get statistic every ' + num + ' second\n');
      }
      else if(num == 0) num = '';
      clearInterval(timerId);
      timerId = setInterval(() =>
      {
        process.stdout.write('Time:'+ (Date.now()-start)/1000 + ' Stat:' + Stat + ' Commit:' + Comm + '\n');
        Stat++;
      }, num * 1000);
      timerId.unref();
      if(!num)
      {
        clearInterval(timerId);
        process.stdout.write('->statistic stoped\n');
        Stat--;
        finish = (new Date()).toString().substr(3, 21);
      }

    }
    else process.stdout.write('Unknow comand: ' + chunk.trim() + '\n');
  }
});
