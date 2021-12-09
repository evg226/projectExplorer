// Контроллер для работы с запросами по автору проекта
const ApiError = require("../errors/apiError");
const { Author, Type, Project} = require("../models/models");

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

    async remove(request,response, next) {
        try{
            const {id}=request.body;
            const project=await Project.findAll({where:{authorId:id}});
            if (project&&project.length) {
                return next(ApiError.badRequest(`Найдено ${project.length} проектов с таким типом. Удалите сначала проекты`));
            }
            const result= await Author.destroy({where:{id}});
            return response.json(result);
        }catch (error){
            next(ApiError.badRequest(error.message));
        }
    }
    async update(request,response, next) {
        try{
            const {id,name}=request.body;
            const result= await Author.update({name},{where:{id}});
            return response.json(result);
        }catch (error){
            next(ApiError.badRequest(error.message));
        }
    }
};

module.exports = new AuthorController();