// Класс для обработки ошибок restapi
class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    };

    // неописанные пути и параметры
    static badRequest(message) {
        return new ApiError(404, message);
    };

    // внутренние ошибки сервера
    static internal(message) {
        return new ApiError(500, message);
    };

    //ошибки с авторизацией
    static forbidden(message) {
        return new ApiError(403, message);
    }
}

module.exports = ApiError;