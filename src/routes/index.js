//chứa tất cả router của API
const UserRouter = require("./UserRouter");
const TagRouter = require("./TagRouter");
const AdminRouter = require("./AdminRouter");
const QuestionRouter = require("./QuestionRouter");
const QuestionVoteRouter = require("./QuestionVoteRouter");
const QuestionReportRouter = require("./QuestionReportRouter");
const Answer = require("./AnswerRouter");
const Saved = require("./SavedRouter");
const CommentRouter = require("./CommentRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/tag", TagRouter);
  app.use("/api/admin", AdminRouter);
  app.use("/api/question", QuestionRouter);
  app.use("/api/answer", Answer);
  app.use("/api/saved", Saved);
  app.use("/api/answer", Answer);
  app.use("/api/comment", CommentRouter);
  app.use("/api/question-vote", QuestionVoteRouter);
  app.use("/api/question-report", QuestionReportRouter);
};

module.exports = routes;
