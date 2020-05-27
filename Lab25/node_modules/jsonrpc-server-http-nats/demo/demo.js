// Подключаем модуль
const JsonRPCServer = require('../src/jsonrpc-server');

// Создаем экземпляр сервера
var server = new JsonRPCServer();

// Обработчик на метод Ping
server.on('Ping', (response) => {
    let error = null;
    let result = 'Pong';
    response(error, result);
});

// Валидатор и обработчик на метод Hello, с проверкой параметра
var validator = function(param) {
    if (typeof(param) !== 'string') {
        throw new Error('Ожидается строка');
        return;
    }
    return param;
}

server.on('Hello', validator, (params, channel, response) => {
    let error = null;
    let result = `Hello ${params} on channel ${channel||'HTTP'}!`;
    response(error, result);
});


// Возврат ошибки с информацие о канале
server.on('ItIsNotWork', (params, response)=>{
    let error = {
        code: 1,
        message: 'Custom error'
    }
    response(error);
});


// Запустим сервер
server.listenHttp({credential: 'ABCD'});
//server.listenNats('nats://127.0.0.1:4222', 'TestChannel');