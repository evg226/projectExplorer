const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("ADMIN"), typeController.create); //добавление
router.get("/",  typeController.getAll); //получение
router.delete("/", checkRoleMiddleware("ADMIN"), typeController.remove); //удаление
router.put("/", checkRoleMiddleware("ADMIN"), typeController.update); //удаление

module.exports = router;