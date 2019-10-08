const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const HOST = 'localhost';
const PORT = 5000;
const app = express();
const _URI = ['/'];

app.use(bodyParser.json());
app.use(express.static(__dirname + '/f'));

Fun = function(request, response, next)
{
    if (request.method === 'GET')
    {
        if (_URI.includes(request.url))
        {
                next();
        }

            let filePath = __dirname + '/f' + request.url;
            File(filePath, response);
    }
}

function File(filePath, response)
{
    fs.stat(filePath, (err, stats) =>
    {
        if (err) return;
        if (stats.isFile())response.sendFile(filePath);
    });
}


app.use(Fun);

app.get('/', (request, response) =>
{
    response.sendFile(__dirname + '/index.html');
});

app.listen(PORT, HOST, () =>
{
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
});
