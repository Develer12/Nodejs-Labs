const Db = require('./DB_Handler');
const DB = new Db();

const PORT = 3000;
const HOST = 'localhost';


app.get('/api/:tab', (req, res) =>
{
    console.log('Get faculties');
    let tab = req.params.tab;
    getHand(tab, req, res);
});

function getHand(tab, req, res)
{
    DB.Get(tab).then(records =>
    {res.json(records.recordset);}).catch(error =>
        {
            res.statusCode = 400;
            res.json({error: String(error)});
        });
}

//-----POST------
app.post('/api/:tab', (req, res) =>
{
    console.log('Get faculties');
    let tab = req.params.tab;
    postHand(tab, req, res);
});

function postHand()
{
    DB.Insert(object, req.body).then(record =>
    {res.json(record.recordset[0]);}).catch(error =>
    {
        res.statusCode = 400;
        res.json({error: String(error)});
    });
}

//-----PUT------
app.put('/api/:tab', (req, res) =>
{
    console.log('Get faculties');
    let tab = req.params.tab;
    putHand(tab, req, res);
});

function putHand()
{
    DB.Update(object, req.body).then(record =>
    {res.json(record.recordset[0]);}).catch(error =>
    {
        res.statusCode = 400;
        res.json({error: String(error)});
    });
}

//-----DELETE------
app.delete('/api/:tab/:code', (req, res) =>
{
    let tab = req.params.tab;
    let code = req.params.code;
});
