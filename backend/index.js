require("dotenv").config(); //загрузка переменных окружения
const express = require("express");//использование express.js
const sequelize = require("./db");//загрузка описания подключения к db postresql через ORM sequelize
const models = require("./models/models"); // загрузка описания модели и связей 
const cors = require("cors");
const fileUpload = require("express-fileupload"); //для загрузки рисунков в проект
const router = require("./routes/index"); //загрузка роутера
const errorHandler = require("./middleware/errorHandlingMiddleware"); //загрузка middleware обрабатывающего ошибки
const path = require("path");

const PORT = process.env.PORT || 5001;
const app = express();

// настройка cors
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "static"))); // указываем папку для загрузки статических файлов
app.use(fileUpload({})); //подключение загрузчика рисунков
app.use("/api", router); //подключение роутера

app.use(errorHandler); //обработка ошибок

// описание инициализации сервера
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`\n\nServer has started on port ${PORT}`));
    } catch (error) {
        console.log("ERROR: " + error);
    }
}

start();
