const express = require('express');

const PORT = 3000;
const app = express();

const userLogin = require(__dirname + '/controller/login/user');

app.use('/login/user', userLogin);

app.listen(PORT, () =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
