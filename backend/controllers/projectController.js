require("dotenv").config(); //загрузка переменных окружения
const fs=require("fs");
const uuid = require("uuid");
const path = require("path");
const { Project, Img, Stack, Rating, Type, User} = require("../models/models");
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

            const project = await Project.create({
                name,
                description,
                start,
                finish,
                typeId,
                authorId,
                icon:fileName
            });
            return next(ApiError.badRequest(project)); //обработка ошибки в случае возникновения

            if (stack) { //Добавление массива stack в БД
                const stacks = JSON.parse(stack);
                stacks.map(async (item) => {
                    const newStack = await Stack.create({
                        name:item.name,
                        description: item.description,
                        projectId:project.id
                    });
                });
            };

            if (image) {
                image = image.length? image : [image];
                image.map(async (item) => {
                    let fileName = uuid.v4() + ".png"; // генерируем уникальное имя файла
                    item.mv(path.resolve(__dirname, "..", "static", fileName)); //размещаем полученный файл на сервере
                    const img = await Img.create({// создание рисунка с кодом проекта в БД
                        projectId: project.id,
                        name: project.name + " - основной",
                        path: fileName
                    });
                });
            }

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
        let condition={limit,offset,include:{model:Type}};
        if (authorId && !typeId) condition={...condition,where:{authorId}};
        if (!authorId && typeId) condition={...condition,where:{typeId}};
        if (authorId && typeId) condition={...condition,where:{typeId,authorId}};
        project = await Project.findAndCountAll(condition);
        return response.json(project);
    }

    async getOne(request, response) {
        const id = request.params.id;                    // id получаем как параметр
        const project = await Project.findOne({
            where: { id },                               //фильтр по id
            include: [{ model: Stack, as: "stack" },   // получаем элементы из связанной сущности Stack
            { model: Img, as: "img" },         // получаем элементы из связанной сущности Img
            {
                model: Rating,
                as: "rates",
                include:[{
                    model:User,
                    attributes:["email"]
                }]
            }]         // получаем элементы из связанной сущности Rating
        });
        return response.json(project);
    }

    async remove(request, response, next) {
        try {
            // const {id} = request.body; //получаем данные по проекту
            const id = parseInt(request.params.id);                    // id получаем как параметр
            const images=await Img.findAll({where:{projectId:id}})
            const result = await Project.destroy({where: {id}});
            if (result) {
                images && images.map(item=>{
                    fs.unlinkSync(path.resolve(__dirname, "..", "static", item.path));
                });
            }
            response.json(result);
        } catch (error) {
            next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        }
    }

    async update(request, response, next) {
        try {
            const id = parseInt(request.params.id);
            const data = request.body; //получаем данные по проекту
            const result = await Project.update(data,{where: {id}});
            response.json(result);
        } catch (error) {
            next(ApiError.badRequest(error.message)); //обработка ошибки в случае возникновения
        }
    }
};

module.exports = new ProjectController();