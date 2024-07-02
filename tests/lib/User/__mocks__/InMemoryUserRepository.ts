import { User } from "src/lib/User/domain/User";
import { UserId } from "src/lib/User/domain/UserId";
import { UserRepository } from "src/lib/User/domain/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  constructor(private readonly users: User[] = []) {}

  async create(user: User) {
    this.users.push(user);
  }
  async getAll() {
    return this.users;
  }
  async getOneById(id: UserId) {
    return this.users.find((user) => user.id.value === id.value) ?? null;
  }
  async edit(user: User) {
    const index = this.users.findIndex((u) => u.id.value === user.id.value);
    if (index === -1) {
      throw new Error("User not found");
    }
    this.users[index] = user;
  }
  async delete(id: UserId) {
    const index = this.users.findIndex((u) => u.id.value === id.value);
    if (index === -1) {
      throw new Error("User not found");
    }
    this.users.splice(index, 1);
  }
}
