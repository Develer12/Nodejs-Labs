const errors = require('./modules/jsonrpc-errors'),
    HttpServer = require('./modules/http-server'),
    NatsServer = require('./modules/nats-server'),
    jsonrpc = require('./modules/jsonrpc');

var Server = function(httpServer) {
    
    this._methods = {};
    this._credential = {};
    this._http = new HttpServer(httpServer);
    this._nats = new NatsServer();
    
    this._http.onRequest = (input, channel, headers, callback) => {
        this._onRequest(input, channel, headers, callback);
    }

    this._nats.onRequest = (input, channel, callback) => {
        this._onRequest(input, channel, null, callback);
    }
}

/**
 * Метод навешивает реакцию на метод JSONRPC
 * 
 * @param {string} event Метод
 * @param {object} validator Функция, которая валидирует переданные параметры, типа function(inputParams, (error, checkedParams)=>{}), не обязательно
 * @param {function} callback Функция, для обработки метода, типа function(checkedParams, (error, response)=>{})
 */
Server.prototype.on = function(method, validator, callback) {
    if (!callback) {
        callback = validator;
        validator = function(params) {
            return params;
        };
    };

    this._methods[method] = {
        func: callback,
        validator: validator
    };
};

/**
 * Метод запускает прием запросов на HTTP сервер
 * 
 * @param options Объект настройки http сервера
 * @param server Экземпляр http сервера, не обязательный параметр
 * @param callback Функция в которую при запуске сервера будет передана ошибка или undefined, если запуск прошел успешно
 */
Server.prototype.listenHttp = function(options, callback) {
    options = options || {};
    this._credential = options.credential || null;
    this._http.listen(options, callback);
};

/**
 * Метод запускает прием запросов из Nats
 */
Server.prototype.listenNats = function(options, channel, onConnect, onError) {
    this._nats.listen(options, channel, onConnect, onError);
}

/**
 * Метод устанаваливает заголовки для ответов HTTP сервера
 *
 * @param headers Объект, где свойство - название заголовка, а значение - значение заголовка
 * 
 */
Server.prototype.setHTTPHeaders = function(headers) {
    this._http.setHTTPHeaders(headers);
}

/**
 * Метод включает дополнительный канал для запросов из Nats
 */
Server.prototype.addNatsChannel = function(channel, callback) {
    this._nats.addChannel(channel, callback);
}

Server.prototype._checkParams = function(method, params) {
    var clearedParams;
    switch (typeof(this._methods[method].validator)) {
        case 'object':
            clearedParams = this._methods[method].validator.check(params);
            break;
        case 'function':
            clearedParams = this._methods[method].validator(params);
            break;
        default:
            clearedParams = params;
    }

    return clearedParams;
}

Server.prototype._onRequest = function(content, channel, headers, callback) {
    jsonrpc.parse(content, (errorResponse, id, method, params)=>{
        if (errorResponse) {
            callback(errorResponse);
            return;
        }

        if (!channel && this._credential && (!headers || !headers['x-credential'] || headers['x-credential'] !==  this._credential)) {
            errorResponse = jsonrpc.create(id, errors.SERVICE_FORBIDDEN);
            callback(errorResponse);
            return;
        }
        
        if (!this._methods[method]) {
            errorResponse = jsonrpc.create(id, errors.METHOD_IS_NOT_FOUND);
            callback(errorResponse);
            return;
        }
        
        let clearedParams;
        try {
            clearedParams = this._checkParams(method, params);
        } catch(e) {
            let error = {};
            Object.assign(error, errors.INVALID_PARAMS, {data: e.message});
            errorResponse = jsonrpc.create(id, error);
            callback(errorResponse);
            return;
        }

        try {
            switch(this._methods[method].func.length) {
                case 1:
                    this._methods[method].func((error, result)=>{
                        if (error) {
                            errorResponse = jsonrpc.create(id, error);
                            callback(errorResponse);
                            return;
                        }
    
                        callback(jsonrpc.create(id, undefined, result));
                    });
                    break;
                case 2:
                    this._methods[method].func(clearedParams, (error, result)=>{
                        if (error) {
                            errorResponse = jsonrpc.create(id, error);
                            callback(errorResponse);
                            return;
                        }
    
                        callback(jsonrpc.create(id,undefined, result));
                    });
                    break;
                case 3:
                    this._methods[method].func(clearedParams, channel, (error, result)=>{
                        if (error) {
                            errorResponse = jsonrpc.create(id, error);
                            callback(errorResponse);
                            return;
                        }
    
                        callback(jsonrpc.create(id, undefined, result));
                    });
                    break; 
                case 4:
                    this._methods[method].func(clearedParams, channel, headers, (error, result)=>{
                        if (error) {
                            errorResponse = jsonrpc.create(id, error);
                            callback(errorResponse);
                            return;
                        }
    
                        callback(jsonrpc.create(id, undefined, result));
                    });
                    break; 
                default:
                    console.log('Error arg length in' + f.name);
                    errorResponse = jsonrpc.create(id, errors.INTERNAL_ERROR);
                    callback(errorResponse);
                    return;
    
            }
        } catch(e) {
            console.log(e);
            errorResponse = jsonrpc.create(id, errors.INTERNAL_ERROR);
            callback(errorResponse);
            return;
        }
        
    });
};

module.exports = Server;
