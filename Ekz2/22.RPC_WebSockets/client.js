const rpc = require('rpc-websockets').Client;
const wsrpc = new rpc('ws://localhost:4003');
wsrpc.on('open', () =>{
    wsrpc.call('sum', [2, 4, 6, 8, 10]).then(answer => console.log('sum: ' + answer));
    wsrpc.login({login: 'admin', password: 'admin'})
    .then(async login =>{
        if (login){
            wsrpc.call('square', [5, 4]).then(answer => console.log('square: ' + answer));
        }
        else{
            console.log('Unauthorized');
        }
    });
});
