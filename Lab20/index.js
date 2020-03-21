const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars')
.create({extname:'.hbs', helpers: require('./views/UserHelpers/PhoneList')});
const DB = require('./model/DB');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use('/static',express.static(__dirname + '/views/static'));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


app.get('/', (req, res)=>{
  res.render('index', {
    layout:null,
    list: DB.GetAll(),
    fadd: true
  });
});
app.get('/Add', (req, res)=>{
  res.render('index', {
    layout:null,
    list: DB.GetAll(),
    field: true,
    add: true
  });
});
app.get('/Update', (req, res)=>{
  res.render('index', {
    layout:null,
    list: DB.GetAll(),
    field: true,
    change: true
  });
});


app.post('/Add', (req, res)=>{
  console.log('add');

  DB.Add(req.body);

  res.render('index', {
    layout:null,
    list: DB.GetAll(),
    field: true,
    add: true
  });
});
app.post('/Update', async (req, res)=>{
  console.log('up');

  await DB.Update(req.body);

  res.render('index', {
    layout:null,
    field: true,
    list: DB.GetAll(),
    change: true
  });
});
app.post('/Delete', (req, res)=>{
  console.log('del');

  DB.Delete(req.body.number);

  res.render('index', {
    layout:null,
    field: true,
    list: DB.GetAll(),
    change: true
  });
});



app.listen(PORT, () =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
