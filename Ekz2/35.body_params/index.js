const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
app.use(bodyParser.urlencoded({urlencoded: false}));

app.post('/', (req, res) => {
    console.log(`${req.body.id} ${req.body.name}`);
    res.send(`${req.body.id} ${req.body.name}`);
});

app.listen(PORT, () =>{
    console.log(`Listening on http://localhost:${PORT}`);
})
