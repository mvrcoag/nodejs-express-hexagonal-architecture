import { UserId } from "../../../../src/lib/User/domain/UserId";
import { User } from "../../../../src/lib/User/domain/User";
import { randEmail, randFirstName, randUuid } from "@ngneat/falso";
import { UserName } from "../../../../src/lib/User/domain/UserName";
import { UserCreatedAt } from "../../../../src/lib/User/domain/UserCreatedAt";
import { UserEmail } from "../../../../src/lib/User/domain/UserEmail";

export class UserStub {
  static create(): User {
    return new User(
      new UserId(randUuid()),
      new UserName(this.createSafeName()),
      new UserEmail(randEmail()),
      new UserCreatedAt(new Date()),
    );
  }

  static createSafeName(): string {
    const name = randFirstName();
    if (name.length < 3) return this.createSafeName();
    return name;
  }
}
