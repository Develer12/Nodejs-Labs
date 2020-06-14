const express = require('express');
const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
    //http://localhost:3000/?a=21
    res.send(req.query.a);
});

app.listen(PORT, () =>{
    console.log(`Listening on http://localhost:${PORT}`);
})
