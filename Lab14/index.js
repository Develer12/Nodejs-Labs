const Db = require('./queries');
const DB = new Db();

const PORT = 3000;
const HOST = 'localhost';



//-----GET------
app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/FACULTY', (req, res) =>
{
    console.log('Get faculties');
    getHand('FACULTY', req, res);
});

app.get('/api/PULPIT', (req, res) =>
{
    console.log('Get pulpits');
    getHand('PULPIT', req, res);
});

app.get('/api/SUBJECT', (req, res) =>
{
    console.log('Get subjects');
    getHand('SUBJECT', req, res);
});

app.get('/api/AUDITORIUM_TYPE', (req, res) =>
{
    console.log('Get Auditorium Type');
    getHand('AUDITORIUM_TYPE', req, res);
});

app.get('/api/AUDITORIUM', (req, res) =>
{
    console.log('Get Auditorium');
    getHand('AUDITORIUM', req, res);
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
app.post('/api/FACULTY', (req, res) =>
{
    console.log('Get faculties');
    postHand('FACULTY', req, res);
});

app.post('/api/PULPIT', (req, res) =>
{
    console.log('Get pulpits');
    postHand('PULPIT', req, res);
});

app.post('/api/SUBJECT', (req, res) =>
{
    console.log('Get subjects');
    postHand('SUBJECT', req, res);
});

app.post('/api/AUDITORIUM_TYPE', (req, res) =>
{
    console.log('Get Auditorium Type');
    postHand('AUDITORIUM_TYPE', req, res);
});

app.post('/api/AUDITORIUM', (req, res) =>
{
    console.log('Get Auditorium');
    postHand('AUDITORIUM', req, res);
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
app.put('/api/FACULTY', (req, res) =>
{
    console.log('Get faculties');
    putHand('FACULTY', req, res);
});

app.put('/api/PULPIT', (req, res) =>
{
    console.log('Get pulpits');
    putHand('PULPIT', req, res);
});

app.put('/api/SUBJECT', (req, res) =>
{
    console.log('Get subjects');
    putHand('SUBJECT', req, res);
});

app.put('/api/AUDITORIUM_TYPE', (req, res) =>
{
    console.log('Get Auditorium Type');
    putHand('AUDITORIUM_TYPE', req, res);
});

app.put('/api/AUDITORIUM', (req, res) =>
{
    console.log('Get Auditorium');
    putHand('AUDITORIUM', req, res);
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
app.delete('/api/faculties/:xy', (req, res) =>
{
    let xy = req.params.xy;
});

app.delete('/api/pulpits/:xy', (req, res) =>
{
    let xy = req.params.xy;
});

app.delete('/api/subjects/:xy', (req, res) =>
{
    let xy = req.params.xy;
});

app.delete('/api/auditortype/:xy', (req, res) =>
{
    let xy = req.params.xy;
});

app.delete('/api/auditor/:xy', (req, res) =>
{
    let xy = req.params.xy;
});
