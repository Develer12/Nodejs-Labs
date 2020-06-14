const express = require('express');
const app = express();

app.use((req, res, next)=>{
    console.log('mid 1');
    next();
    console.log('mid 3');
});
app.use((req, res, next)=>{
    console.log('mid 2');
    res.send('second middleware');
});
app.listen(3000, () =>
{
  console.log(`Listening on http://localhost:3000`);
})
