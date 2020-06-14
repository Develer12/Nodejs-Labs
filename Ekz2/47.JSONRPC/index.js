const JsonRPCServer = require('jsonrpc-server-http-nats');
const server = new JsonRPCServer();
const config = {
    host: 'localhost',
    port: 3000
};

let JsonRPCValidMulti = (param, response) => {
    if(!Array.isArray(param)){
        throw new Error(`It's not Array: ` + param);
    }
    return param;
};

/*
{
    "jsonrpc": "2.0",
    "method": "sum",
    "params": [42, 23],
    "id": 1
}
*/

server.on('sum', JsonRPCValidMulti, (params, channel, response) => {
    console.log(params);
    response(null, params.reduce((a, b) => a + b));
});

server.listenHttp({host: config.host, port: config.port}, () => {
    console.log(`Listening to http://${config.host}:${config.port}`);
});
