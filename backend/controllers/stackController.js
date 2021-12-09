// Контроллер для работы с запросами по автору проекта
const ApiError = require("../errors/apiError");
const {Stack} = require("../models/models");


class StackController {
    async create(request, response,next) {
        try {
            const {projectId} = request.params;
            const { name,description } = request.body;
            const stack = await Stack.create({ name,description,projectId });
            return response.json(stack);
        } catch (error) {
            next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        };
    }

    async getAll(request, response) {
        const {projectId} = request.params;
        const stacks = await Stack.findAll({where:{projectId}});
        return response.json(stacks);
    }



    async remove(request,response, next) {
        try{
            const {id}=request.params;
            const result= await Stack.destroy({where:{id}});
            return response.json(result);
        }catch (error){
            next(ApiError.badRequest(error.message));
        }
    }

    async update(request,response, next) {
        try{
            const {id}=request.params;
            const {name,description}=request.body;
            const result= await Stack.update({name,description},{where:{id}});
            return response.json(result);
        }catch (error){
            next(ApiError.badRequest(error.message));
        }
    }
    // async update(request,response, next) {
    //     try{
    //         const {id,name}=request.body;
    //         const result= await Author.update({name},{where:{id}});
    //         return response.json(result);
    //     }catch (error){
    //         next(ApiError.badRequest(error.message));
    //     }
    // }
};

module.exports = new StackController();