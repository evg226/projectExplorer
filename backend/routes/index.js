const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
const authorRouter = require("./authorRouter");
const projectRouter = require("./projectRouter");
const basketProjectRouter = require("./basketProjectRouter");
const ratingRouter = require("./ratingRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/author", authorRouter);
router.use("/project", projectRouter);
router.use("/basket-project", basketProjectRouter);
router.use("/rating", ratingRouter);

module.exports = router;
