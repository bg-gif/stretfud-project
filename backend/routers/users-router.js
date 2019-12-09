const usersRouter = require("express")();
const { handle405s } = require("../errors/index");
const { getUserById, postUser } = require("../controllers/users-controller.js");

usersRouter
  .route("/:username")
  .get(getUserById)
  .all(handle405s);

usersRouter
  .route("/")
  .post(postUser)
  .all(handle405s);

module.exports = usersRouter;
