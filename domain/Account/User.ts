import crypto from "crypto";
import { Avatar } from "domain/Account";
import { IAccountRepository } from "infrastructure";

export abstract class User {
  public password?: string;

  constructor(public repo: IAccountRepository, public accountId: string, public email: string) {}

  public async login(options: LoginOptions): Promise<boolean> {
    if (this.password === undefined) {
      this.password = await this.repo.getUserPassword(this.accountId);
    }

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

  public async updatePassword(password: string): Promise<boolean> {
    this.password = this.password ?? (await this.repo.getUserPassword(this.accountId));

    password = User.hashPassword(password);

    if (password === this.password) {
      return false;
    }

    this.repo.updateUserPassword(this.accountId, password);
    return true;
  }

  public upgradeToPlayer(avatar: Avatar): Player {
    const p = new Player(this.repo, this.accountId, this.email);
    p.avatar = avatar;
    return p;
  }
}

export class LoginOptions {
  constructor(public email: string, public password: string) {}
}

export class Player extends User {
  private _avatar?: Avatar;

  public get avatar(): Avatar {
    return (this._avatar = this._avatar ?? this.repo.getAvatar(this.accountId));
  }

  public set avatar(value: Avatar) {
    this._avatar = value;
  }

  public get level(): number {
    return this.avatar.level;
  }

  constructor(repo: IAccountRepository, accountId: string, email: string) {
    super(repo, accountId, email);
  }
}
