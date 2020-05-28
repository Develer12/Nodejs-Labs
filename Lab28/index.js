const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');
const DB = require('./model/DB');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.get('/ts', (req, res)=>{
    console.log('get');
    res.json(DB.GetAll());
});

app.post('/ts', (req, res)=>{
    console.log('add');
    if(DB.Add(req.body)){
        res.json({ message: 'Line is posted'});
    }
    else{
        res.status(400).json({ message: 'One or more of parameters are missing'});
    }
});

app.put('/ts', async (req, res)=>{
    console.log('update');
    if(DB.Update(req.body)){
        res.json({ message: 'Line is updated'});
    }
    else{
        res.status(400).json({ message: 'One or more of parameters are missing'});
    }
});

app.delete('/ts', (req, res)=>{
      console.log('del');
      if(DB.Delete(req.query.number)){
          res.json({ message: 'Line is deleted'});
      }
      else{
          res.status(400).json({ message: 'One or more of parameters are missing'});
      }
});


app.listen(PORT, () =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
