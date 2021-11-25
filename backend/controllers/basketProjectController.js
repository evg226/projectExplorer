// Контроллер для работы с избранными проектами
const ApiError = require("../errors/apiError");
const { BasketProject, Basket } = require("../models/models");


class BasketProjectController {
    async create(request, response,next) {
        try {
            const { projectId } = request.body; //Получаем id проекта, который нужно добавить в избранное
            const userId=request.user.id; //Получаем id пользователя, в избранное которого нужно добавить проект
            const basket = await Basket.findOne({where:{userId}}); //получаем id избранного (корзины) пользователя
            const basketId=basket.id;
            let basketProject = await BasketProject.findOne({ where: { basketId,projectId } }); //Проверяем добавлен ли проект в корзину проектов пользователя
            if (basketProject) {
                return next(ApiError.badRequest("Проект уже в избранных"));
            }
            basketProject = await BasketProject.create({  //вставляем проект в корзину проектов пользователя
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