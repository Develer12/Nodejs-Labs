let http = require('http');
let query = require('querystring');
let fs = require('fs');


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
    let data = '';
    res.on('data', (chunk) =>{console.log('Data: ', data += chunk.toString('utf8'));});
});


param = query.stringify({x:3, y: 4});
options.path = `/xy?${param}`;
const req2 = http.request(options, (res) =>
{
    console.log('------------TASK2------------');
    console.log('Status: ' + res.statusCode + '. ' + res.statusMessage);
    let data = '';
    res.on('data', (chunk) =>{console.log('Parameters: ', data += chunk.toString('utf8'));});
});


param = query.stringify({x:3, y: 4, s: 'Dada'});
options.path = `/xys?${param}`;
options.method = 'POST';
const req3 = http.request(options, (res) =>
{
    console.log('------------TASK3------------');
    console.log('Status: ' + res.statusCode + '. ' + res.statusMessage);
    let data = '';
    res.on('data', (chunk) =>{console.log('Parameters: ', data += chunk.toString('utf8'));});
});


options.path = `/json`;
options.headers = {'Content-Type': 'application/json', 'accept': 'application/json'};
const req5 = http.request(options, (res) =>
{
    console.log('------------TASK4------------');
    let data = '';
    res.on('data', (chunk) =>{console.log('JSON: ', data += chunk.toString('utf8'));});
});


options.path = `/xml`;
options.headers = {'Content-Type': 'text/xml', 'accept': 'text/xml'};
const req4 = http.request(options, (res) =>
{
    console.log('------------TASK5------------');
    let data = '';
    res.on('data', (chunk) =>{console.log('XML: \n', data += chunk.toString('utf8'));});
});


options.path = `/txt`;
options.headers = {'Content-Type': 'text/plain', 'accept': 'text/plain'};
const req6 = http.request(options, (res) =>
{
    console.log('------------TASK6------------');
    let data = '';
    res.on('data', (chunk) =>{console.log('TXT: \n', data += chunk.toString('utf8'));});
});


options.path = `/png`;
options.headers = {'Content-Type' : 'image/png', 'accept' : 'image/png'};
const req7 = http.request(options, (res) =>
{
    console.log('------------TASK7------------');
    let data = '';
    res.on('data', (chunk) =>{console.log('PNG here');});
});


options.path = `/getfile`;
options.headers = {'Content-Type': 'text/plain', 'accept': 'text/plain'};
options.method = 'GET';
const req8 = http.request(options, (res) =>
{
    console.log('------------TASK8------------');
    let data = '';
    res.on('data', (chunk) =>{console.log('File: \n', data += chunk.toString('utf8'));});
});

req1.end();
req2.end();
req3.end();
req4.end(fs.readFileSync(__dirname + '/files/f.xml'));
req5.end(fs.readFileSync(__dirname + '/files/f.json'));
req6.end(fs.readFileSync(__dirname + '/files/f.txt'));
req7.end(fs.readFileSync(__dirname + '/files/f.png'));
req8.end();
