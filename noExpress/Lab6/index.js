const http = require('http');
var mod = require('./m0603');

const HOST = 'localhost';
const PORT = 5000;

console.log("-->sendmail: ", require.resolve('sendmail'));

async function mail()
{
  async (req, res) => {
      let newObject = {
        name: req.query.name,
        birth: req.query.birth
      } = req.body;
      console.log("Info about Emails get");
  }
}

let http_handler = (req, res)=>
{
  switch (req.method)
  {
    case 'GET': GET_handler(req, res);  break;
    case 'PUT': PUT_handler(req, res);  break;
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
    default: HTTP404(req, res);  break;
  }
};

let PUT_handler = (req, res)=>
{
  switch (req.url)
  {
    case '/sendMS':
      (req, res) =>
      {
          var newObject =
          {
            mfrom: req.query.mfrom,
            mfor: req.query.mfor,
            Message: req.query.message
          } = req.body;
          console.log("Info about Emails get");
      }
      console.log("Sending Start");
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
