const app = require('express')();
const session = require('express-session')({
    secret: '1234567890'
});
app.use(session);
app.get('/', (req, res) => {
    if(!isFinite(req.session.mysesval)){
        req.session.mysesval = 0;
    }
    else{
        req.session.mysesval++;
    }
    res.send('val ' + req.session.mysesval);
});

app.listen(3000, () =>{
  console.log(`Listening on http://localhost:3000`);
})
