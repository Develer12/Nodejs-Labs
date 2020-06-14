const app = require('express')();

app.get('/d', (req, res) => {
    res.download('file.txt');
});

app.get('/a', (req, res) => {
    //Content-Disposition: attachment; filename="filename.jpg"
    res.attachment('file.txt');
    res.send();
});

app.listen(3000, () =>{
  console.log(`Listening on http://localhost:3000`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});

