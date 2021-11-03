//Требуется установка postresql (postresql.org)
// sudo apt-get update
// sudo apt-get install postgresql postgresql-contrib
// sudo - i - u postgres
// Создаем БД
// createdb dbprojects
// создаем пользователя dbprojects
// createuser --interactive
// создаем пользователя dbprojects
// создаем пользователя dbprojects в linux
// sudo adduser dbprojects
// sudo -i -u dbprojects
// psql
// \password dbprojects



const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres'
    }
);
