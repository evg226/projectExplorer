const Router = require("express");
const router = new Router();
const projectController = require("../controllers/projectController");

router.post("/", projectController.create); //добавление
router.get("/", projectController.getAll); //получение
router.get("/:id", projectController.getOne); //получение по id

module.exports = router;