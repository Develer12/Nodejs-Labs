let http = require('http');
let query = require('querystring');

let path = `/getinfo`;

let options =
{
  host:'localhost',
  path:path,
  port: 5000,
  method:'GET'
};

const req = http.request(options, (res) =>
{
    console.log(`Method: ${req.method}`);
    console.log(`StatusCode: ${res.statusCode}`);
    console.log(`StatusMessage: ${req.statusMessage}`);
    console.log(`RemoteAddress: ${req.connection.remoteAddress}`);
    console.log(`RemotePort: ${req.connection.remotePort}`);
    console.log('Body: ' + JSON.stringify(res.data));
});

req.end();
