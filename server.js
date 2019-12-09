const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routers/api-router");
const {
  handle404s,
  handleCustoms,
  handle422s,
  handle500s,
  handle400s
} = require("./errors");

app.use(express.json());

app.use("/api", apiRouter);
app.use("/*", handle404s);
app.use(handle400s);
app.use(handle422s);
app.use(handleCustoms);
app.use(handle500s);

module.exports = app;
