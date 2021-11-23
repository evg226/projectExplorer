require("dotenv").config(); //загрузка переменных окружения
const uuid = require("uuid");
const path = require("path");
const { Project, Img, Stack, Rating } = require("../models/models");
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

            let {icon,image} = request.files;

            let fileName = uuid.v4() + ".png"; // генерируем уникальное имя файла
            if (icon) {
                icon.mv(path.resolve(__dirname, "..", "static", fileName)); //размещаем полученный файл на сервере
            }

            const project = await Project.create({ //создание проекта в БД
                name,
                description,
                start,
                finish,
                typeId,
                authorId,
                icon:fileName
            });

            image=image.length?image:[image];
            image.map(async (item) => {
                let fileName = uuid.v4() + ".png"; // генерируем уникальное имя файла
                item.mv(path.resolve(__dirname, "..", "static", fileName)); //размещаем полученный файл на сервере
                const img = await Img.create({// создание рисунка с кодом проекта в БД
                    projectId: project.id,
                    name: project.name + " - основной",
                    path: fileName
                });
            });

            if (stack) { //Добавление массива stack в БД
                const stacks = JSON.parse(stack);

                stacks.map(async (item) => {
                    const newStack = await Stack.create({
                        name:item.name,
                        description: item.desc,
                        projectId:project.id
                    });
                    console.log(newStack);
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
            include: [{ model: Stack, as: "stack" },   // получаем элементы из связанной сущности Stack
            { model: Img, as: "img" },         // получаем элементы из связанной сущности Img
            { model: Rating, as: "rates" }]         // получаем элементы из связанной сущности Rating
        });
        return response.json(project);
    }
};

module.exports = new ProjectController();