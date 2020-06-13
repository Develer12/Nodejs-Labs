const app = require('express')();

app.get('/', (req, res) => {
    res.redirect( '/a')
});
app.get('/a', (req, res) => {
    res.send(308, 'da')
});

app.listen(3000, () =>{
  console.log(`Listening on http://localhost:3000`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});

