const { request, response } = require("express");
const Router = require("express");
const router = new Router();

router.post("/signup"); //регистрация пользователя
router.post("/sign"); //логин пользователя
router.get("/auth",); //проверка авторизованности пользователя

module.exports = router;