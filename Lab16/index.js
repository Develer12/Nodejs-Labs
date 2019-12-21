const http = require('http');
const exgraphql = require('express-graphql');
const express = require('express');

const app = express();
const PORT = 3000;
//Schema
const schema = require('./schema');

app.use('/', exgraphql(
{
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});
