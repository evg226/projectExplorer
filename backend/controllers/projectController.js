require("dotenv").config(); //загрузка переменных окружения
const uuid = require("uuid");
const path = require("path");
const { Project, Img, Stack } = require("../models/models");
const ApiError = require("../errors/apiError");

class ProjectController {
    async create(request, response, next) {
        try {
            let {
                name,
                description,
                start,
                finish,
                typeId,
                authorId,
                stack
            } = request.body; //получаем данные по проекту

            const project = await Project.create({ //создание проекта в БД
                name,
                description,
                start,
                finish,
                typeId,
                authorId
            });

            if (stack) { //Добавление массива stack в БД
                stack = JSON.parse(stack);
                stack.foreach(item => {
                    Stack.create({
                        name:item.name,
                        description: item.description,
                        projectId:project.id
                    });
                });
            };

            if (image) {
                const { image } = request.files; //получаем картинку по проекту
                let fileName = uuid.v4() + ".png"; // генерируем уникальное имя файла
                image.mv(path.resolve(__dirname, "..", "static", fileName)); //размещаем полученный файл на сервере

                const img = await Img.create({// создание рисунка с кодом проекта в БД
                    projectId: project.id,
                    name: project.name + " - основной",
                    path: fileName
                });
            };
            return response.json(project);

        } catch (error) {
            next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        };
    }

    async getAll(request, response) {
        let { authorId, typeId, limit, page } = request.query; //получаем параметры фильтра и пагинации
        limit = limit || process.env.PAGE_LIMIT; //лимит на страницу
        page = page || process.env.PAGE_CURRENT; // номер текущей страницы
        let offset = page * limit - limit; //начальный номер выборки
        let project;
        // фильтр по автору и типу проекта и пагинацией
        if (!authorId && !typeId) {
            project = await Project.findAndCountAll({limit,offset});    
        };
        if (authorId && !typeId) {
            project = await Project.findAndCountAll({where:{authorId},limit,offset});
        };
        if (!authorId && typeId) {
            project = await Project.findAndCountAll({where:{typeId},limit,offset});
        };
        if (authorId && typeId) {
            project = await Project.findAndCountAll({where:{authorId,typeId},limit,offset});
        }
        return response.json(project);
    }

    async getOne(request, response) {
        const id = request.params.id;                    // id получаем как параметр
        const project = await Project.findOne({
            where: { id },                               //фильтр по id
            include: [{ model: Stack, as: "stack" }],   // получаем элементы из связанной сущности Stack
            include: [{ model:Img, as: "img" }]         // получаем элементы из связанной сущности Img
        });
        return response.json(project);
    }
};

module.exports = new ProjectController();