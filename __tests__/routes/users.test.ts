import request from "supertest";
import app from "../../src/app";
import { StatusCodes } from "http-status-codes";

describe("POST /login", () => {
  it("should return 200 OK", async () => {
    
    const response = await request(app).post("/users/login").send({
      username: "a",
      password: "a",
    });

    expect(response.status).toBe(StatusCodes.OK);
  });

  it("should return 404 for username and password not matching", async () => {
    const response = await request(app).post("/users/login").send({
      username: "wronguser",
      password: "wrongpass",
    });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});
