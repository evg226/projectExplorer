const Router = require("express");
const router = new Router();
const ratingController = require("../controllers/ratingController");
const authMiddlware = require("../middleware/authMiddlware");

router.post("/", authMiddlware, ratingController.create); //добавление
// router.get("/",  ratingController.getAll); //получение

module.exports = router;