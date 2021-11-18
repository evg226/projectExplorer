const ApiError = require("../errors/apiError");
const { Rating } = require("../models/models");

class RatingController {
    async create(request, response,next) {
        try {
            const { projectId, rate, description } = request.body;
            if (!projectId || !rate) {
                return next(ApiError.badRequest("Не выбран проект или нет оценки")); 
            }
            const userId = request.user.id;
            let rating = await Rating.findOne({ where: { userId, projectId } });
            if (rating) {
                return next(ApiError.badRequest("Вы уже оценили проект")); 
            };
            rating = await Rating.create({
                rate,
                description,
                userId,
                projectId
            });
            
            return response.json(rating);
        } catch (error) {
            next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        };
    }

    async getAll(request, response) {
        const { userId, projectId } = request.query;
        let condition={};
        if (userId) condition = { ...condition, userId };
        if (projectId) condition = {...condition,projectId};
        const rating = await Rating.findAll({where:condition});    
        return response.json(rating);
    }
};

module.exports = new RatingController();