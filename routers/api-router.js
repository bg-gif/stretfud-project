const apiRouter = require("express")();
const { handle405s } = require("../errors/index");
const vendorsRouter = require("./vendors-router");
const usersRouter = require("../routers/users-router");

apiRouter.use("/vendors", vendorsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
