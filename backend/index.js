require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");

const PORT = process.env.PORT || 5001;
const app = express();

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
    } catch (error) {
        console.log("ERROR: " + error);
    }
}

start();
