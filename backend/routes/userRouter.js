const { request, response } = require("express");
const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController"); //загрузка контроллера пользователя 
const authMiddlware = require("../middleware/authMiddlware");
const checkRoleForSignup=require("../middleware/checkRoleForSignup");

router.post("/signup",  checkRoleForSignup, userController.signup); //регистрация пользователя
router.post("/signin", userController.signin); //логин пользователя
router.get("/auth",authMiddlware, userController.authCheck); //проверка авторизованности пользователя

module.exports = router;