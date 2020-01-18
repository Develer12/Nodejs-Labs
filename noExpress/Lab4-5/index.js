const http = require('http');
const fs = require('fs');
const url = require('url');
const DataBase = require('./db/DataBase');

const HOST = 'localhost';
const PORT = 3000;

const db = new DataBase(DataBase.names());

db.on('get', async (req, res) => {
    await res.end(JSON.stringify(await db.getRows()));
    console.log("DB get");
});
db.on('post', async (req, res) => {Get_Body(req, res, 'post');});
db.on('put', async (req, res) => {Get_Body(req, res, 'put');});

function Get_Body(req, res, meth)
{
  let body = ' ';
  req.on('data', chunk => {
        body = chunk.toString();
        body = JSON.parse(body);
    });
  req.on('end', async () => {
    let EndBody =
    {
        id: body.id,
        name: body.name,
        birth: body.birth
    };
      console.log('BODY END:' + JSON.stringify(EndBody));
      if(meth == 'post')
        await res.end(JSON.stringify(await db.addRow(EndBody)));
      else if (meth == 'put')
        await res.end(JSON.stringify(await db.updateRow(EndBody)));
      console.log("DB " + meth);
    });
}
db.on('delete', async (req, res) => {
    await res.end(JSON.stringify(await db.removeRow(url.parse(req.url, true).query.id)));
    console.log("DB delete");
});
db.on('commit', async (req, res) => {
    await res.end(await db.stCommit());
    console.log("DB commit");
});


let http_handler = (req, res)=>
{
  switch (req.method)
  {
    case 'GET': GET_handler(req, res);  break;
    case 'POST': POST_handler(req, res);  break;
    case 'PUT': PUT_handler(req, res);  break;
    case 'DELETE': DELETE_handler(req, res);  break;
    default: HTTP404(req, res);  break;
  }
};

let GET_handler = (req, res)=>
{
  switch (req.url)
  {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(fs.readFileSync(__dirname + '/index.html'));
      console.log("App sendFile");
    break;
    case '/api/ss':
      if(finish == 0)
      {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end('Сбор статистики еще не завершен');
      }
      else
      {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify({ Start: St1, Finish: finish, Commit: Comm, Statistic: Stat }));
      }
      console.log("Open statistic");
    break;
    case '/commit':
      db.emit('commit', req, res);
      console.log("App commit");
    break;
    case '/api/db':
      db.emit('get', req, res);
      console.log("App get");
    break;
    default: HTTP404(req, res);  break;
  }
};

let POST_handler = (req, res)=>
{
  switch (req.url)
  {
    case '/api/db':
      db.emit('post', req, res);
      console.log("App post");
    break;
    default: HTTP404(req, res);  break;
  }
};

let PUT_handler = (req, res)=>
{
  switch (req.url)
  {
    case '/api/db':
      db.emit('put', req, res);
      console.log("App put");
    break;
    default: HTTP404(req, res);  break;
  }
};

let DELETE_handler = (req, res)=>
{
  let Path_forGet = url.parse(req.url, true).pathname;
  console.log(req.url);
  switch ('/'+GetUrlPart(Path_forGet, 1)+'/'+GetUrlPart(Path_forGet, 2))
  {
    case '/api/db':
      db.emit('delete', req, res);
      console.log("App delete");
    break;
    default: HTTP404(req, res);  break;
  }
};

let HTTP404 = (req, res)=>
{
  res.statusCode = 404;
  res.statusMessage = 'Resourse not found';
  res.end('Resourse not found');
};

const server = http.createServer().listen(PORT, (v) =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)})
.on('request', http_handler);

function GetUrlPart(url_path, indx)
{
  let i = 0;
  let curr_url = ' ';
  i--;
  decodeURI(url_path).split('/').forEach(e =>
    {
      i++;
      console.log(i+' ' + e);
      if(i == indx)
      {
        curr_url = e;
        return;
      }
    });
  return curr_url;
}

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
        (req, res) => db.emit('commit', (req, res));
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
