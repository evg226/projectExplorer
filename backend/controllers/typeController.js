// Контроллер для работы с запросами по типу проектов
const ApiError = require("../errors/apiError");
const { Type } = require("../models/models");

class TypeController {
    async create(request, response,next) {
        try {
            const { name } = request.body;
            const type = await Type.create({ name });
            return response.json(type);
        } catch (error) {
            next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        };
    }

    async getAll(request, response) {
        const type = await Type.findAll();
        return response.json(type);
    }
};

module.exports = new TypeController();