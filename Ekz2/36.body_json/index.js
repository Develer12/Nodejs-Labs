const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
    if(req.accepts('json'))
        res.json(req.body);
    else 
        res.send('no json');
});

app.listen(PORT, () =>{
    console.log(`Listening on http://localhost:${PORT}`);
})
