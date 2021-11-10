const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("ADMIN"), typeController.create); //добавление
router.get("/",  typeController.getAll); //получение

module.exports = router;