// Контроллер для работы с избранными проектами
const ApiError = require("../errors/apiError");
const { BasketProject, Basket } = require("../models/models");


class BasketProjectController {
    async create(request, response,next) {
        try {
            const { projectId } = request.body;
            // const basket = await Basket.findAll();
            let basketProject = await BasketProject.findOne({ where: { projectId } });
            if (basketProject) {
                return next(ApiError.badRequest("Проект уже в избранных")); 
            }
            const basket = await Basket.findOne({ where: { userId: request.user.id } });
            basketProject = await BasketProject.create({
                basketId: basket.id,
                projectId
            });
            return response.json(basketProject);
        } catch (error) {
            return next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        };
    }

    async getAll(request, response) {
        const { projectId } = request.query;
        const basket = await Basket.findOne({ where: { userId: request.user.id } });
        let condition = { basketId: basket.id };
        if (projectId) condition = { ...condition, projectId };
        const basketProject = await BasketProject.findAll({where: condition});
        return response.json(basketProject);
    }
};

module.exports = new BasketProjectController();