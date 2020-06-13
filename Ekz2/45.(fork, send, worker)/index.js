const child = require('child_process');
const fp = child.fork('fork.js');

const send = () => {
    fp.send('HI');
};
setInterval(send, 2000);