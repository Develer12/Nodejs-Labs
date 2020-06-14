const RPC = require('rpc-websockets').Server;
const wsrpc = new RPC({port: 4003, host: 'localhost'});

let square = (args) => {
    if (args.length === 1) return Math.PI * Math.pow(args[0], 2);
    else if (args.length === 2) return args[0] * args[1];
    else return 0;
}

wsrpc.setAuth(credentials => credentials.login === 'admin' && credentials.password === 'admin');
wsrpc.register('sum', params => params.reduce((a, b) => a + b, 0)).public();
wsrpc.register('square', square).protected();
