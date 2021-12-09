// Контроллер для работы с запросами по типу проектов
const ApiError = require("../errors/apiError");
const { Type, Project} = require("../models/models");

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

    async remove(request,response, next) {
        try{
            const {id}=request.body;
            const project=await Project.findAll({where:{typeId:id}});
            if (project&&project.length) {
                return next(ApiError.badRequest(`Найдено ${project.length} проектов с таким типом. Удалите сначала проекты`));
            }
            const result= await Type.destroy({where:{id}});
            return response.json(result);
        }catch (error){
            next(ApiError.badRequest(error.message));
        }
    }

    async update(request,response, next) {
        try{
            const {id,name}=request.body;
            const result= await Type.update({name},{where:{id}});
            return response.json(result);
        }catch (error){
            next(ApiError.badRequest(error.message));
        }
    }
};

module.exports = new TypeController();