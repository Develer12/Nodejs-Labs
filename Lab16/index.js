const http = require('http');

const PORT = 3000;
//DB handler
const Db = require('./db_hand0');
const DB = new Db();


let http_handler = (req, res)=>
{
  switch (req.method)
  {
    case 'GET': GET_handler(req, res);  break;
    default: HTTP404(req, res);  break;
  }
};

let GET_handler = (req, res)=>
{
  switch (req.url)
  {
    case '/insertvalid':

    default: HTTP404(req, res);  break;
  }
};

let HTTP404 = (req, res)=>
{
  res.statusCode = 404;
  res.statusMessage = 'Resourse not found';
  res.end('Resourse not found');
};

function reqForTran(que1, que2, que3, req, res)
{
    DB.Tran(que1).catch(error =>
    {
        res.statusCode = 400;
        res.json({error: String(error)});
    });
}


const server = http.createServer().listen(PORT, (v) =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)})
.on('request', http_handler);
