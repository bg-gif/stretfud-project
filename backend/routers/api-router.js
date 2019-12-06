const apiRouter = require("express")();
const { handle405s } = require("../errors/index");
const vendorsRouter = require("./vendors-router");

apiRouter.use("/vendors", vendorsRouter);

module.exports = apiRouter;
