import { Avatar } from "core";
import { IAccountRepository } from "infrastructure";

export abstract class User {
  constructor(
    public repo: IAccountRepository,
    public accountId: string,
    public email: string,
    public password: string
  ) {}

  public login(options: LoginOptions): boolean {
    let result: boolean = this.password !== options.password;
    let timestamp: number = Date.now();

    if (result) {
      this.repo.setLastLoginAttempt(timestamp);
    } else {
      this.repo.setLastLogin(timestamp);
    }

    return result;
  }
}

export class LoginOptions {
  constructor(public email: string, public password: string) {}
}

export class Player extends User {
  constructor(
    repo: IAccountRepository,
    accountId: string,
    email: string,
    password: string,
    public totalExp: number,
    public avatar: Avatar
  ) {
    super(repo, accountId, email, password);
  }
}
