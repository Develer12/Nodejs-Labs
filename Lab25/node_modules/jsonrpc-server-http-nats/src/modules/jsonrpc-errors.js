module.exports = {
    PARSE_ERROR: {
        code: -32700,
        message: "PARSE_ERROR",
        data: "Ошибка разбора входящего JSON"
    },
    INTERNAL_ERROR: {
        code: -32603,
        message: "INTERNAL_ERROR",
        data: "Внутренняя ошибка сервиса (не обработанное исключение, отвалившаяся БД или что-то другое)"
    },
    INVALID_PARAMS: {
        code: -32602,
        message: "INVALID_PARAMS",
        data: "Ошибка в параметрах запроса"
    },
    METHOD_IS_NOT_FOUND: {
        code: -32601,
        message: "METHOD_IS_NOT_FOUND",
        data: "Запрошенный метод не существует"
    },
    INVALID_REQUEST: {
        code: -32600,
        message: "INVALID_REQUEST",
        data: "Ошибка запроса (не соответсвует стандарту JSON-RPC)"
    },
    SERVICE_FORBIDDEN: {
        code: -32004,
        message: "SERVICE_FORBIDDEN",
        data: "Доступ к сервису запрещен (для внутреннего использования)"
    },
    SERVICE_UPDATING: {
        code: -32003,
        message: "SERVICE_UPDATING",
        data: "Происходит обновления сервиса, времено не доступен"
    },
    SERVICE_DISABLED: {
        code: -32002,
        message: "SERVICE_DISABLED",
        data: "Попытка обращения к устаревшему сервису, необходимо обновить клиента, генерирует Nginx"
    },
    SERVICE_ERROR: {
        code: -32001,
        message: "SERVICE_ERROR",
        data: "Обращение к сервису, которого никогда не существовало, генерирует Nginx"
    }
}