const errors = require('./jsonrpc-errors');

module.exports.create = function(id, error, result) {
    let jrpc = {
        jsonrpc: "2.0",
        id: id || null,
    }

    // Если ошибка - возвращаем, даже если не передан id
    if (error) {
        jrpc.error = error;
        return JSON.stringify(jrpc);
    }

    // Если не передан id - ничего не возвращаем
    if (!id) {
        return '';
    }

    jrpc.result = result;

    return JSON.stringify(jrpc);
}


module.exports.parse = function(content, callback) {
    // Если нет тела запроса
    if (!content) {
        let error = this.create(null, errors.INVALID_REQUEST);
        callback(error);
        return;
    }
    

    let json;
    try {
        json = JSON.parse(content);
    } catch(e) {
        // Если ошибка разбора JSON
        let error = this.create(null, errors.PARSE_ERROR);
        callback(error);
        return;
    }

    if (!json.jsonrpc || json.jsonrpc !== '2.0') {
        // Если нет идентификатора протокола
        let error = this.create(null, errors.INVALID_REQUEST);
        callback(error);
        return;
    }

    // Если нет метода
    if (!json.method) {
        let error = this.create(null, errors.METHOD_IS_NOT_FOUND);
        callback(error);
        return;
    }

    callback(undefined, json.id, json.method, json.params);
}