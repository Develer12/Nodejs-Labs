const http = require('http');
const url = require('url');
const fs = require('fs');
const ST = require('./StudentList');

const fdir = __dirname + '/StudentList.json';
const PORT = 5000;
const HOST = 'localhost';

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

function GetUrlParam(url_parm, name_parm)
{
  let curr_url = new URL(url_parm);
  let serch_parm = curr_url.searchParams;
  if (serch_parm.has(name_parm))
    return curr_url.searchParams.get(name_parm);
  else return null;
}

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
    return curr_url?curr_url:' ';
}

let GET_handler = (req, res)=>
{
  let Path_forGet = url.parse(req.url, true).pathname;
  switch ('/'+GetUrlPart(Path_forGet, 1))
  {
    case '/ ':
      res.end(JSON.stringify(ST));
    break;
    case '/backup':
      fs.readdir(__dirname + '/backups/', (err, files) =>
      {
        let backN = 0;
        if (err) throw err;
        files.forEach(file =>
        {
          console.log(file);
          if (file.includes('StudentList'))
          {
            backN++;
            res.write(`<p>${backN}. ${file}</p>`)
          }
        });
        res.end(`Count: ${backN}`);
      });
    break;
    default:
      if(Number.isInteger(parseInt(GetUrlPart(Path_forGet, 1))))
      {
        let n = parseInt(GetUrlPart(Path_forGet, 1));
        let index = ST.findIndex(s => s.id == n);
        console.log(`indx ${index}`);
        if((index || index==0) && index>=0)
          res.end(JSON.stringify(ST[index]));
        else
        {
          res.statusCode = 404;
          res.end();
        }
      }
      else HTTP404(req, res);
    break;
  }
};

let POST_handler = (req, res)=>
{
  let Path_forGet = url.parse(req.url, true).pathname;
  switch ('/'+GetUrlPart(Path_forGet, 1))
  {
    case '/ ':
      let body = ' ';
      req.on('data', chunk => {
            body = chunk.toString();
            body = JSON.parse(body);
        });
      req.on('end', async () => {
        if (ST.find(s => s.id == body.id))
        {
            res.statusCode = 400;
            res.end(JSON.stringify({error: 'Student with this ID is already exists'}));
        }
        else
        {
            let student = {id: body.id, name: body.name, birth: body.birth, speciality: body.speciality};
            ST.push(student);
            fs.writeFile(fdir, JSON.stringify(ST, null, '  '), () => {});
            res.end(JSON.stringify(student));
        }
      });
    break;
    case '/backup':
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
    break;
    default: HTTP404(req, res);  break;
  }
};

let PUT_handler = (req, res)=>
{
  let Path_forGet = url.parse(req.url, true).pathname;
  switch ('/'+GetUrlPart(Path_forGet, 1))
  {
    case '/ ':
      let body = ' ';
      req.on('data', chunk => {
            body = chunk.toString();
            body = JSON.parse(body);
      });
      req.on('end', async () => {
        let index = ST.findIndex(s => s.id == body.id);
        if (ST !== -1)
        {
          let stNew = {id: body.id, name: body.name, birth: body.birth, speciality: body.speciality};
          let stOld = ST[index];
          Object.keys(stOld).forEach(n =>
          {
              if (stNew[n] && stOld[n] !== stNew[n])
                  stOld[n] = stNew[n];
          });
          fs.writeFile(fdir, JSON.stringify(ST, null, '  '), () => {});
          res.end(JSON.stringify(stOld));
        }
        else
        {
          res.statusCode = 401;
          res.end(JSON.stringify({error: 'Student with current id not founded'}));
        }
      });
    break;
    default: HTTP404(req, res);  break;
  }
};

let DELETE_handler = (req, res)=>
{
  let Path_forGet = url.parse(req.url, true).pathname;
  console.log(req.url);
  switch ('/'+GetUrlPart(Path_forGet, 1))
  {
    case '/backup':
      let date = GetUrlPart(Path_forGet, 2);
      fs.readdir(__dirname + '/backups', (err, files) =>
      {
          if (err)
          {
              res.statusCode = 500;
              res.end(JSON.stringify({error: err.message}));
              throw err;
          }

          let BackupDate = dateSlice(date);

          files.forEach(file =>
          {
              let fBackupDate = dateSlice(file);
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
    break;
    default:
      if(Number.isInteger(parseInt(GetUrlPart(Path_forGet, 1))))
      {
        let n = GetUrlPart(Path_forGet, 2);
        let index = ST.findIndex(s => s.id == n);
        if(index)
        {
          ST.splice(ST.findIndex(s => s.id == n), 1);
          fs.writeFile(fdir, JSON.stringify(ST, null, '  '), () => {});
          res.end(JSON.stringify(index));
        }
        else
        {
          res.statusCode = 404;
          res.end();
        }
      }
      else HTTP404(req, res);
    break;
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
