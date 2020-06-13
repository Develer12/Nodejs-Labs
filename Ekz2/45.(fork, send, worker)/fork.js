const child = require('child_process');

process.on('message', (msg) => {
    console.log(msg);
});