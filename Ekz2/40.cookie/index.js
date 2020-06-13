const app = require('express')();
const cookieparser = require('cookie-parser')();
app.use(cookieparser);

app.get('/', (req, res) => {
    //noExpress
    //res.writeHead(200, {'Set-Cookie': 'i=2' })
    let id = req.cookies.id;
    if(!isFinite(id)){
        id = 1;
    }
    else{
        id++;
    }
    res.cookie('id', id);
    //signed - подписан, для слежки за изменением
    res.clearCookie('i');
    res.send();
});

app.listen(3000, () =>{
  console.log(`Listening on http://localhost:3000`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});

