// Контроллер для работы с запросами по автору проекта
const ApiError = require("../errors/apiError");
const {Stack, Img, Project} = require("../models/models");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

class ImageController {

    async create(request, response,next) {
        let fileName = uuid.v4() + ".png";
        try {
            const {projectId} = request.params;
            const {image} = request.files;
            if (image)
                image.mv(path.resolve(__dirname, "..", "static", fileName));
            const img = await Img.create({ name:"Основной",path:fileName,projectId });
            return response.json(img);
        } catch (error) {
            try {
                fs.unlinkSync(path.resolve(__dirname, "..", "static", fileName));
            } catch (e) {
                console.log(e.message);
            }
            next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        };
    }

    async getAll(request, response) {
        const {projectId} = request.params;
        const images = await Img.findAll({where:{projectId}});
        return response.json(images);
    }

    async remove(request,response, next) {
        try{
            const {id} = request.params;
            const image = await Img.findOne({where: {id}});
            const result = await Img.destroy({where: {id}});
            if (result) {
                try {
                    fs.unlinkSync(path.resolve(__dirname, "..", "static", image.path));
                    response.json(result);
                } catch (error) {
                    console.log(error.message);
                }
            } else
                next(ApiError.badRequest(`Рисунка ${id} нет в базе`));
        } catch (e){
            next(ApiError.badRequest(e.message));
        }
    }
};

module.exports = new ImageController();