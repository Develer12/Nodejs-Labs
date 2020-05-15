const app = require('express')();
const {createClient} = require('webdav');
const config = require('./config.json');
const webDavClient = createClient(config.url, config.login);
const PORT = 3000;


app.post('/md/:dict', (req, res) => {
    let dict = `/${req.params.dict}`;

    webDavClient.exists(dict)
    .then((exist) => {
        if(exist){
            res.status(408);
            return {error: 'Directory exists'};
        }
        else{
            return webDavClient.createDirectory(dict)
            .then(() => ({message: `Directory '${dict}' created`}));
        }
    })
    .then((message) => res.json(message))
    .catch((err) => res.status(400).json({error: err.toString()}));
});

app.post('/rd/:dict', (req, res) => {
    let dict = `/${req.params.dict}`;

    webDavClient.exists(dict)
    .then(exist =>{
        if(exist){
            return webDavClient.deleteFile(dict)
            .then(() => ({message: `Directory '${dict}' removed`}));
        }
        else{
            res.status(408);
            return {error: 'Directory is not exists'};
        }
    })
    .then((message) => res.json(message))
    .catch((err) => res.status(400).json({error: err.toString()}));
});

app.post('/up/:file', (req, res) => {
    try {
        let dict = `/${req.params.file}`;

        req.pipe(webDavClient.createWriteStream(dict))
        .on('end', () => {
            res.json({message: `File '${dict}' uploaded`})
        });
    }
    catch (err){
        res.status(408).json({error: err.toString()})
    }
});

app.post('/down/:file', (req, res) => {
    let dict = `/${req.params.file}`;

    webDavClient.exists(dict)
    .then(exist => {
        if(exist){
            webDavClient.createReadStream(dict).pipe(res);
        }
        else{
            res.status(404);
            return {error: 'File is not exists'};
        }
    })
    .then((message) => message ? res.json(message) : null)
    .catch((err) => res.status(400).json({error: err.toString()}));
});

app.post('/del/:file', (req, res) => {
    let dict = `/${req.params.file}`;

    webDavClient.exists(dict)
    .then(exist =>{
        if(exist){
            return webDavClient.deleteFile(dict)
            .then(() => ({message: `File '${dict}' removed`}));
        }
        else{
            res.status(408);
            return {error: 'File is not exists'};
        }
    })
    .then((message) => res.json(message))
    .catch((err) => res.status(400).json({error: err.toString()}));
});

app.post('/copy/:file/:file2', (req, res) => {
    let dict = `/${req.params.file}`;
    let dict2 = `/${req.params.file2}`;

    webDavClient.exists(dict)
    .then(exist =>{
        if(exist){
            try {
                return webDavClient.copyFile(dict, dict2)
                .then(() => ({message: `File '${dict}' copied to ${dict2}`}));
            }
            catch (err){
                res.status(404);
                return {error: 'File cannot be copied'};            }
        }
        else{
            res.status(408);
            return {error: 'File is not exists'};
        }
    })
    .then((message) => res.json(message))
    .catch((err) => res.status(400).json({error: err.toString()}));
});

app.post('/move/:file/:file2', (req, res) => {
    let dict = `/${req.params.file}`;
    let dict2 = `/${req.params.file2}`;

    webDavClient.exists(dict)
    .then(exist =>{
        if(exist){
            try {
                return webDavClient.moveFile(dict, dict2)
                .then(() => ({message: `File '${dict}' moved to ${dict2}`}));
            }
            catch (err){
                res.status(404);
                return {error: 'File cannot be moved'};
            }
        }
        else{
            res.status(408);
            return {error: 'File is not exists'};
        }
    })
    .then((message) => res.json(message))
    .catch((err) => res.status(400).json({error: err.toString()}));
});


app.listen(PORT, () =>{
  console.log(`Listening on https://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
