// Контроллер для работы с запросами по автору проекта
const ApiError = require("../errors/apiError");
const { Author } = require("../models/models");

class AuthorController {
    async create(request, response) {
        try {
            const { name } = request.body;
            const author = await Author.create({ name });
            return response.json(author);
        } catch (error) {
            next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        };
    }

    async getAll(request, response) {
        const author = await Author.findAll();
        return response.json(author);
    }
};

module.exports = new AuthorController();