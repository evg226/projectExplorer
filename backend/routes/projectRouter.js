const Router = require("express");
const router = new Router();
const projectController = require("../controllers/projectController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const stackController = require("../controllers/stackController");


router.post("/",checkRoleMiddleware("ADMIN"), projectController.create); //добавление
router.get("/", projectController.getAll); //получение
router.get("/:id", projectController.getOne); //получение по id
router.put("/:id",checkRoleMiddleware("ADMIN"), projectController.update); //Изменение
router.delete("/:id",checkRoleMiddleware("ADMIN"), projectController.remove); //Удаление

router.get ("/:projectId/stack",stackController.getAll); //обработка стека текущего проекта
router.post ("/:projectId/stack",checkRoleMiddleware("ADMIN"),stackController.create);
router.delete("/:projectId/stack/:id",checkRoleMiddleware("ADMIN"), stackController.remove); //Удаление
router.put("/:projectId/stack/:id",checkRoleMiddleware("ADMIN"), stackController.update); //Изменение
module.exports = router;