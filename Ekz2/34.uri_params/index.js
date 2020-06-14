const express = require('express');
const PORT = 3000;
const app = express();

app.get('/:a', (req, res) => {
    //http://localhost:3000/21
    res.send(req.params.a);
});

app.listen(PORT, () =>{
    console.log(`Listening on http://localhost:${PORT}`);
})
