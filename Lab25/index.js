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

let JsonRPCValidDuo = (param, response) => {
    if(!Array.isArray(param)){
        throw new Error(`It's not Array: ` + param);
    }
    if(param.length != 2){
        throw new Error(`More then 2 params, params count: ` + param.length);
    }

    return param;
};

server.on('sum', JsonRPCValidMulti, (params, channel, response) => {
    console.log(params);
    response(null, params.reduce((a, b) => a + b));
});

server.on('mul', JsonRPCValidMulti, (params, channel, response) => {
    response(null, params.reduce((a, b) => a * b));
});

server.on('div', JsonRPCValidDuo, (params, channel, response) => {
    response(null, params.reduce((a, b) => a * b));
});

server.on('proc', JsonRPCValidDuo, (params, channel, response) => {
    response(null, params[0] * 100 / params[1]);

});


server.listenHttp({host: config.host, port: config.port}, () => {
    console.log(`Listening to http://${config.host}:${config.port}`);
});
