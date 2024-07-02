import { PostgresUserRepository } from "src/lib/User/infrastructure/PostgresUserRepository";

import * as dotenv from "dotenv";
import { UserStub } from "../domain/UserStub";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

describe("PostgresUserRepository should", () => {
  it("create", async () => {
    const repository = new PostgresUserRepository(DATABASE_URL);

    const user = UserStub.create();

    await repository.create(user);

    const findedUser = await repository.getOneById(user.id);

    expect(findedUser).not.toBeNull();

    expect(findedUser?.id.value).toBe(user.id.value);
    expect(findedUser?.name.value).toBe(user.name.value);
    expect(findedUser?.email.value).toBe(user.email.value);

    await repository.delete(user.id);
  });

  it("get all", async () => {
    const repository = new PostgresUserRepository(DATABASE_URL);

    const user = UserStub.create();
    const user2 = UserStub.create();

    await repository.create(user);
    await repository.create(user2);

    const users = await repository.getAll();

    expect(users.length).toBeGreaterThanOrEqual(2);

    await repository.delete(user.id);
    await repository.delete(user2.id);
  });

  it("get one by id", async () => {
    const repository = new PostgresUserRepository(DATABASE_URL);

    const user = UserStub.create();

    await repository.create(user);

    const userFound = await repository.getOneById(user.id);

    expect(userFound).not.toBeNull();
    expect(userFound?.id.value).toBe(user.id.value);
    expect(userFound?.name.value).toBe(user.name.value);
    expect(userFound?.email.value).toBe(user.email.value);

    await repository.delete(user.id);
  });

  it("edit", async () => {
    const repository = new PostgresUserRepository(DATABASE_URL);

    const user = UserStub.create();

    await repository.create(user);

    const newUser = UserStub.create();
    newUser.id = user.id;

    await repository.edit(newUser);

    const findedUser = await repository.getOneById(user.id);

    expect(findedUser).not.toBeNull();
    expect(findedUser?.id.value).toBe(newUser.id.value);
    expect(findedUser?.name.value).toBe(newUser.name.value);
    expect(findedUser?.email.value).toBe(newUser.email.value);

    await repository.delete(user.id);
  });

  it("delete", async () => {
    const repository = new PostgresUserRepository(DATABASE_URL);

    const user = UserStub.create();

    await repository.create(user);

    const usersBefore = await repository.getAll();

    expect(usersBefore.length).toBeGreaterThan(0);

    await repository.delete(user.id);

    const finedUser = await repository.getOneById(user.id);

    expect(finedUser).toBeNull();
  });
});
