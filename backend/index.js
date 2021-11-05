require("dotenv").config(); //загрузка переменных окружения
const express = require("express");//использование express.js
const sequelize = require("./db");//загрузка описания подключения к db postresql через ORM sequelize
const models = require("./models/models"); // загрузка описания модели и связей 
const cors = require("cors");
const router = require("./routes/index"); //загрузка роутера


const PORT = process.env.PORT || 5001;
const app = express();

// настройка cors
app.use(cors());
app.use(express.json());

app.use("/api", router);

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
