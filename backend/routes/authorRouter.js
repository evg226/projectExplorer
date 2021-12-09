const Router = require("express");
const router = new Router();
const authorController = require("../controllers/authorController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware ("ADMIN"),authorController.create); //добавление
router.get("/", authorController.getAll); //получение
router.delete("/", checkRoleMiddleware ("ADMIN"),authorController.remove); //добавление
router.put("/", checkRoleMiddleware ("ADMIN"),authorController.update); //добавление
module.exports = router;