const Router = require("express");
const router = new Router();
const basketProjectController = require("../controllers/basketProjectController");
const authMiddlware = require("../middleware/authMiddlware");

router.post("/", authMiddlware, basketProjectController.create); //добавление
router.get("/",authMiddlware, basketProjectController.getAll); //получение

router.delete("/",authMiddlware,basketProjectController.deleteByProjectId); //удаление


module.exports = router;