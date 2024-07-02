import { UserCreate } from "../../../../../src/lib/User/application/UserCreate/UserCreate";
import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository";
import { UserStub } from "../../domain/UserStub";

describe("UserCreate should", () => {
  test("create a user", async () => {
    const repository = new InMemoryUserRepository();
    const useCase = new UserCreate(repository);

    const user = UserStub.create();

    await useCase.run(
      user.id.value,
      user.name.value,
      user.email.value,
      user.createdAt.value,
    );

    const users = await repository.getAll();

    expect(users).toHaveLength(1);

    const createdUser = users[0];

    expect(createdUser.id.value).toBe(user.id.value);
    expect(createdUser.name.value).toBe(user.name.value);
    expect(createdUser.email.value).toBe(user.email.value);
  });
});
