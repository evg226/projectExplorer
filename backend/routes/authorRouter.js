const Router = require("express");
const router = new Router();
const authorController = require("../controllers/authorController");

router.post("/", authorController.create); //добавление
router.get("/", authorController.getAll); //получение

module.exports = router;