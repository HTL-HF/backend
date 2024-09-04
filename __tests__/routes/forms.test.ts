import request from "supertest";
import app from "../../src/app";
import { RequestForm } from "../../src/types/dtos/forms.dto";
import { StatusCodes } from "http-status-codes";

describe("POST /forms", () => {
  it("creating without questions Ok", async () => {
    const loginResponse = await request(app).post("/users/login").send({
      username: "a",
      password: "a",
    });
    const cookie = loginResponse.headers["set-cookie"][0].split("=")[1];

    const formData: RequestForm = { title: "title", questions: [] };
    const formsResponse = await request(app)
      .post("/forms")
      .send(formData)
      .set("Cookie", [`token=${cookie}`]);

    expect(formsResponse.statusCode).toBe(StatusCodes.CREATED);
  });

  it("created with type error", async () => {
    const loginResponse = await request(app).post("/users/login").send({
      username: "a",
      password: "a",
    });
    const cookie = loginResponse.headers["set-cookie"][0].split("=")[1];

    const formData = {
      title: "title",
      questions: [
        {
          required: true,
          title: "testq",
          type: "number",
          viewType: "CHECKBOX",
          options: ["A", "B", "C"],
        },
      ],
    };
    const formsResponse = await request(app)
      .post("/forms")
      .send(formData)
      .set("Cookie", [`token=${cookie}`]);

    expect(formsResponse.statusCode).toBe(StatusCodes.NOT_ACCEPTABLE);
  });

  it("created with view type error", async () => {
    const loginResponse = await request(app).post("/users/login").send({
      username: "a",
      password: "a",
    });
    const cookie = loginResponse.headers["set-cookie"][0].split("=")[1];

    const formData = {
      title: "title",
      questions: [
        {
          required: true,
          title: "testq",
          type: "string",
          viewType: "SHORT",
          options: ["A", "B", "C"],
        },
      ],
    };
    const formsResponse = await request(app)
      .post("/forms")
      .send(formData)
      .set("Cookie", [`token=${cookie}`]);

    expect(formsResponse.statusCode).toBe(StatusCodes.NOT_ACCEPTABLE);
  });

  it("created with view type linear error", async () => {
    const loginResponse = await request(app).post("/users/login").send({
      username: "a",
      password: "a",
    });
    const cookie = loginResponse.headers["set-cookie"][0].split("=")[1];

    const formData = {
      title: "title",
      questions: [
        {
          required: true,
          title: "testq",
          type: "string",
          viewType: "LINEAR",
          options: ["A", "B", "C"],
        },
      ],
    };
    const formsResponse = await request(app)
      .post("/forms")
      .send(formData)
      .set("Cookie", [`token=${cookie}`]);

    expect(formsResponse.statusCode).toBe(StatusCodes.NOT_ACCEPTABLE);
  });
});
