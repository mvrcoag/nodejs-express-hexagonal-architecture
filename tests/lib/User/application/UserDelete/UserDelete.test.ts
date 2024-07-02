import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository";
import { UserStub } from "../../domain/UserStub";
import { UserDelete } from "../../../../../src/lib/User/application/UserDelete/UserDelete";

describe("UserDelete should", () => {
  test("delete a user", async () => {
    const user = UserStub.create();

    const repository = new InMemoryUserRepository([user]);
    const deleteUseCase = new UserDelete(repository);

    const usersBefore = await repository.getAll();

    expect(usersBefore).toHaveLength(1);

    await deleteUseCase.run(user.id.value);

    const usersAfter = await repository.getAll();

    expect(usersAfter).toHaveLength(0);
  });
});
