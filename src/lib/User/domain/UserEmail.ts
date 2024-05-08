export class UserEmail {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value.includes("@") || !this.value.includes(".")) {
      throw new Error("UserEmail must be a valid email address");
    }
  }
}
