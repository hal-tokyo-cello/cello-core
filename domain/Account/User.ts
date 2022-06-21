import crypto from "crypto";

import { Avatar } from "domain/Account";
import { IAccountRepository } from "infrastructure";

export abstract class User {
  constructor(
    public repo: IAccountRepository,
    public accountId: string,
    public email: string,
    public password: string
  ) {}

  public login(options: LoginOptions): boolean {
    let result: boolean = this.password === User.hashPassword(options.password);
    let timestamp: number = Date.now();

    if (result) {
      this.repo.setLastLogin(timestamp);
    } else {
      this.repo.setLastLoginAttempt(timestamp);
    }

    return result;
  }

  public static hashPassword(password: string): string {
    return crypto.createHash("sha256", {}).update(password).digest("hex");
  }

  public static register(repo: IAccountRepository, email: string, password: string): Promise<void> {
    password = this.hashPassword(password);
    return Promise.resolve(
      repo.registerNewUser({ repo: repo, accountId: "", email: email, password: password } as User)
    );
  }

  public upgradeToPlayer(avatar: Avatar): Player {
    return new Player(this.repo, this.accountId, this.email, this.password, 0, avatar);
  }
}

export class LoginOptions {
  constructor(public email: string, public password: string) {}
}

export class Player extends User {
  /**
   * Level function is `50x ^ 2`.
   */
  public get level(): number {
    return this.totalExp == 0 ? 0 : Math.sqrt(this.totalExp / 50);
  }

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
