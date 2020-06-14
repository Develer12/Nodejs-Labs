const express = require('express');
const bodyParser = require('express-xml-bodyparser');
const builder = require('xmlbuilder');
const PORT = 3000;
const app = express();
app.use(bodyParser());

/*
    <q a="da">
        <w b="12" />
    </q>
*/

app.post('/', (req, res) => {
    console.log(req.body);
    let x = req.body.q.$.a;
    let y = req.body.q.w[0].$.b;
    console.log(y + ' ' + x);

    let result = builder.create('result').att('a', x);
    result.ele('w', {value: y});
    
    res.type('xml').send(result.toString({ pretty: true}));
});

app.listen(PORT, () =>{
    console.log(`Listening on http://localhost:${PORT}`);
})
