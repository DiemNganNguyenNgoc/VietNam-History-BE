const httpMocks = require("node-mocks-http");
const QuestionController = require("../controllers/QuestionController");
const QuestionService = require("../services/QuestionService");

jest.mock("../services/QuestionService"); // Tự động mock toàn bộ service

const sampleQuestion = {
  id: "123",
  title: "Sample question title",
  content: "This is a sample content for testing.",
  note: "Sample note",
  tags: ["test", "sample"],
  images: [],
  linkedQuizzes: [],
  answerCount: 0,
  viewCount: 0,
  reportCount: 0,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};


describe("createQuestion", () => {
 //tao cau hoi that bai - thieu title
  it("return 400 if required fields are missing", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: { content: "abc", title: "erorr" }, // thiếu userQuery
    });
    const res = httpMocks.createResponse();

    await QuestionController.createQuestion(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.status).toBe("ERR");
    expect(data.message).toMatch(/required/i);
  });

//tao cau hoi that bai - thieu content
   it("  return 400 if required fields are missing", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: { title:"123", userQuery:"123"}, 
    });
    const res = httpMocks.createResponse();

    await QuestionController.createQuestion(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.status).toBe("ERR");
    expect(data.message).toMatch(/required/i);
  });

//tao cau hoi that bai - thieu content va title
   it("  return 400 if required fields are missing", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {userQuery:"123"}, 
    });
    const res = httpMocks.createResponse();

    await QuestionController.createQuestion(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.status).toBe("ERR");
    expect(data.message).toMatch(/required/i);
  });

  //tao cau hoi that bai - thieu content va userQuery
   it("  return 400 if required fields are missing", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {title:"code ne"}, 
    });
    const res = httpMocks.createResponse();

    await QuestionController.createQuestion(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.status).toBe("ERR");
    expect(data.message).toMatch(/required/i);
  });

//tao cau hoi that bai - thieu title va userQuery
   it("  return 400 if required fields are missing", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {content: "1234"}, 
    });
    const res = httpMocks.createResponse();

    await QuestionController.createQuestion(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.status).toBe("ERR");
    expect(data.message).toMatch(/required/i);
  });

  //tao cau hoi that bai - thieu ca 3 feild
   it("  return 400 if required fields are missing", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {}, 
    });
    const res = httpMocks.createResponse();

    await QuestionController.createQuestion(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.status).toBe("ERR");
    expect(data.message).toMatch(/required/i);
  });

//tao cau hoi thanh cong
  it("  return 200 if question created successfully", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        title: "Test",
        content: "Test content",
        userQues: "user123",
      },
    });
    const res = httpMocks.createResponse();

    // Giả lập phản hồi từ QuestionService
    QuestionService.createQuestion.mockResolvedValue({
      status: "OK",
      message: "Created",
    });

    await QuestionController.createQuestion(req, res);

    expect(res.statusCode).toBe(200);
    expect(QuestionService.createQuestion).toHaveBeenCalledWith({
      title: "Test",
      content: "Test content",
      note: undefined,
      userQues: "user123",
      images: undefined,
      tags: undefined,
    });
    const data = res._getJSONData();
    expect(data.status).toBe("OK");
  });
});


describe("updateQuestion", () => {
  beforeEach(() => {
    QuestionService.updateQuestion.mockClear();
  });

  it("  update question successfully", async () => {
    QuestionService.updateQuestion.mockResolvedValue(sampleQuestion);

    const req = httpMocks.createRequest({
      method: "PUT",
      params: { id: "123" },
      body: { title: "Updated question title" },
    });
    const res = httpMocks.createResponse();

    await QuestionController.updateQuestion(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.id).toBe("123");
    expect(data.title).toBe(sampleQuestion.title);

    expect(QuestionService.updateQuestion).toHaveBeenCalledWith("123", {
      title: "Updated question title",
      content: undefined,
      note: undefined,
      tags: undefined,
      images: undefined,
      linkedQuizzes: undefined,
    });
  });

  it("  return 400 if id is missing", async () => {
    const req = httpMocks.createRequest({
      method: "PUT",
      params: {}, // no id
      body: { title: "Updated question title" },
    });
    const res = httpMocks.createResponse();

    await QuestionController.updateQuestion(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.status).toBe("ERR");
    expect(data.message).toMatch(/Question ID is required/i);
  });

  it("  return 404 if question not found", async () => {
    QuestionService.updateQuestion.mockResolvedValue(null);

    const req = httpMocks.createRequest({
      method: "PUT",
      params: { id: "nonexistent" },
      body: { title: "Updated question title" },
    });
    const res = httpMocks.createResponse();

    await QuestionController.updateQuestion(req, res);

    expect(res.statusCode).toBe(404);
    const data = res._getJSONData();
    expect(data.status).toBe("ERR");
    expect(data.message).toMatch(/Question not found/i);
  });

  it("  return 500 if service throws", async () => {
    QuestionService.updateQuestion.mockRejectedValue(new Error("fail"));

    const req = httpMocks.createRequest({
      method: "PUT",
      params: { id: "123" },
      body: { title: "Updated question title" },
    });
    const res = httpMocks.createResponse();

    await QuestionController.updateQuestion(req, res);

    expect(res.statusCode).toBe(500);
    const data = res._getJSONData();
    expect(data.status).toBe("ERR");
    expect(data.message).toMatch(/An error occurred/i);
  });
});

