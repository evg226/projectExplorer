// Контроллер для работы с избранными проектами
const ApiError = require("../errors/apiError");
const { BasketProject, Basket, Project, Type, Author} = require("../models/models");


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
            next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        };
    }

    async getAll(request, response) {
        if (!request.user) return;
        const userId=request.user.id ;
        const basket = await Basket.findOne({
            where:{userId},
            include:[{
                model:BasketProject,
                include:[{
                    model:Project,
                    include:{
                        model:Type
                    }
                }]
            }]
        });

        const basketId=basket.id;
        const projects=basket.basket_projects.map(item=>item.project);
        return response.json({basketId,projects});
    }

    async deleteByProjectId(request,response,next){
        try{
            const userId=request.user.id;
            const {projectId} = request.body;
            // return response.json({userId,projectId});
            const basket = await Basket.findOne({where:{userId}});
            // const basketProject=await BasketProject.findOne ({where:{basketId:basket.id,projectId}});
            const basketProject = await BasketProject.destroy({where:{basketId:basket.id,projectId}})
            return response.json(basketProject);
        } catch (error) {
            return next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        };
    }

};

module.exports = new BasketProjectController();