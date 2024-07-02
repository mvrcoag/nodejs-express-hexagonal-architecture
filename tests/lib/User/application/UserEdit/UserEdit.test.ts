import { UserEdit } from "src/lib/User/application/UserEdit/UserEdit";
import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository";
import { UserStub } from "../../domain/UserStub";

describe("UserEdit should", () => {
  test("edit a user", async () => {
    const user = UserStub.create();

    const repository = new InMemoryUserRepository([user]);
    const editUseCase = new UserEdit(repository);

    const usersBefore = await repository.getAll();

    expect(usersBefore).toHaveLength(1);

    const newUser = UserStub.create();

    const newName = newUser.name.value;
    const newEmail = newUser.email.value;

    await editUseCase.run(user.id.value, newName, newEmail, new Date());

    const usersAfter = await repository.getAll();

    expect(usersAfter).toHaveLength(1);

    const editedUser = usersAfter[0];

    expect(editedUser.id.value).toBe(user.id.value);
    expect(editedUser.name.value).toBe(newName);
    expect(editedUser.email.value).toBe(newEmail);
  });
});
