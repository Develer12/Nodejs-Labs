const app = require('express')();
const fs = require('fs');
const multer = require('multer');
const PORT = 3000;

app.post('/', multer({dest: 'files/'}).single('file'),  (req, res) => {
    console.log(req.file);
    fs.renameSync(`files/${req.file.filename}`, `files/${req.file.originalname}`);
    res.send(`Upload ${req.file.originalname}`);
});

app.listen(PORT, () =>{
    console.log(`Listening on http://localhost:${PORT}`);
})
