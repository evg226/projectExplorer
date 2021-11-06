const uuid = require("uuid");
const path = require("path");
const { Project, Img } = require("../models/models");
const ApiError = require("../errors/apiError");

class ProjectController {
    async create(request, response, next) {
        try {
            const {
                name,
                description,
                start,
                finish,
                typeId,
                authorId,
                stack
            } = request.body; //получаем данные по проекту

            const { image } = request.files; //получаем картинку по проекту
            let fileName = uuid.v4() + ".png"; // генерируем уникальное имя файла
            image.mv(path.resolve(__dirname, "..", "static", fileName)); //размещаем полученный файл на сервере

            const project = await Project.create({ //создание проекта в БД
                name,
                description,
                start,
                finish,
                typeId,
                authorId
            });

            const img = await Img.create({// создание рисунка с кодом проекта в БД
                projectId: project.id,
                name: project.name + " - основной",
                path: fileName
            });

            return response.json(project);

        } catch (error) {
            next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        };

    }

    async getAll(request, response) {
        const project = await Project.findAll();
        response.json(project);
    }

    async getOne(request, response) {
        const id = request.params.id;
        const project = await Project.findOne({ where: { id } });
        response.json(project);
    }


};

module.exports = new ProjectController();