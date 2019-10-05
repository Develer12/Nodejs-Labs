var Sendmail = require('nodemailer');
var mod = require('./m0603');
const express = require('express');

const HOST = 'localhost';
const PORT = 5000;
const app = express();

console.log("-->sendmail: ", require.resolve('sendmail'));

app.use(express.static('.'));

async function mail()
{
  async (request, response) => {
      let newObject = {
        name: request.query.name,
        birth: request.query.birth
      } = request.body;
      console.log("Info about Emails get");
  }
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
    console.log("App sendFile");
});

app.put('/sendMS', (request, response) => {
    (request, response) => {
        var newObject = {
          mfrom: request.query.mfrom,
          mfor: request.query.mfor,
          Message: request.query.message
        } = request.body;
        console.log("Info about Emails get");
    }
    console.log("Sending Start");
});

app.listen(PORT, HOST, () => {
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
});
