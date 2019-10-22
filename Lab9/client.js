let http = require('http');
let query = require('querystring');


let path = `/getinfo`;
let param = ' ';
let options =
{
  host:'localhost',
  path: path,
  port: 5000,
  method:'GET'
};
const req1 = http.request(options, (res) =>
{
    console.log('------------TASK1------------');
    console.log(`Method: ${req1.method}`);
    console.log(`StatusCode: ${res.statusCode}`);
    console.log(`StatusMessage: ${res.statusMessage}`);
    console.log(`RemoteAddress: ${req1.connection.remoteAddress}`);
    console.log(`RemotePort: ${req1.connection.remotePort}`);
    console.log('Body: ' + JSON.stringify(res.body));
});


param = query.stringify({x:3, y: 4});
options.path = `/xy?${param}`;

const req2 = http.request(options, (res) =>
{
    console.log('------------TASK2------------');
    console.log('Status: ' + res.statusCode + '. ' + res.statusMessage);
    console.log('Parameters: ' + JSON.stringify(res.data));
});


param = query.stringify({x:3, y: 4, s: 'Dada'});
options.path = `/xys?${param}`;
options.method = 'POST';

const req3 = http.request(options, (res) =>
{
    console.log('------------TASK3------------');
    console.log('Status: ' + res.statusCode + '. ' + res.statusMessage);
    console.log('Parameters: ' + JSON.stringify(res.data));
});


req1.end();
req2.end();
req3.end();
