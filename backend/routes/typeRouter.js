const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");

router.post("/", typeController.create); //добавление
router.get("/", typeController.getAll); //получение

module.exports = router;