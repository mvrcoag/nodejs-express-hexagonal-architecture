import * as request from "supertest";
import * as express from "express";
import { ExpressUserRouter } from "src/lib/User/infrastructure/ExpressUserRouter";
import { UserStub } from "../domain/UserStub";

let app: express.Application;

describe("ExpressUserRouter should", () => {
  beforeEach(() => {
    app = express();

    app.use(express.json());
    app.use(ExpressUserRouter);
  });

  it("return an array of users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);

    for (const user of response.body) {
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.createdAt).toBeDefined();
    }
  });

  it("return a user by id", async () => {
    const user = UserStub.create();

    const responseOfCreation = await request(app).post("/users").send({
      name: user.name.value,
      email: user.email.value,
      id: user.id.value,
      createdAt: user.createdAt.value,
    });

    expect(responseOfCreation.status).toBe(201);

    const response = await request(app).get(`/users/${user.id.value}`);

    expect(response.status).toBe(200);

    expect(response.body.id).toBe(user.id.value);
    expect(response.body.name).toBe(user.name.value);
    expect(response.body.email).toBe(user.email.value);

    await request(app).delete(`/users/${user.id.value}`);
  });

  it("create a user", async () => {
    const user = UserStub.create();

    const response = await request(app).post("/users").send({
      name: user.name.value,
      email: user.email.value,
      id: user.id.value,
      createdAt: user.createdAt.value,
    });

    expect(response.status).toBe(201);

    await request(app).delete(`/users/${user.id.value}`);
  });

  it("update a user", async () => {
    const user = UserStub.create();

    const responseOfCreation = await request(app).post("/users").send({
      name: user.name.value,
      email: user.email.value,
      id: user.id.value,
      createdAt: user.createdAt.value,
    });

    expect(responseOfCreation.status).toBe(201);

    const newUser = UserStub.create();
    newUser.id = user.id;

    const response = await request(app).put(`/users`).send({
      name: newUser.name.value,
      email: newUser.email.value,
      id: newUser.id.value,
      createdAt: newUser.createdAt.value,
    });

    expect(response.status).toBe(204);

    await request(app).delete(`/users/${user.id.value}`);
  });

  it("delete a user", async () => {
    const user = UserStub.create();

    const responseOfCreation = await request(app).post("/users").send({
      name: user.name.value,
      email: user.email.value,
      id: user.id.value,
      createdAt: user.createdAt.value,
    });

    expect(responseOfCreation.status).toBe(201);

    const response = await request(app).delete(`/users/${user.id.value}`);

    expect(response.status).toBe(204);
  });
});
