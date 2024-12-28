//chứa tất cả router của API
const UserRouter = require("./UserRouter");
const TagRouter = require("./TagRouter");
const AdminRouter = require("./AdminRouter");
const QuestionRouter = require("./QuestionRouter");
const Answer = require("./AnswerRouter");
const Saved = require("./SavedRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/tag", TagRouter);
  app.use("/api/admin", AdminRouter);
  app.use("/api/question", QuestionRouter);
  app.use("/api/answer", Answer);
  app.use("/api/saved", Saved);
};

module.exports = routes;
