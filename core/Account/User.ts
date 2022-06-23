import { Avatar, Race } from "core";
import crypto from "crypto";
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

  public upgradeToPlayer(option: PlayerUpgradeOption): Promise<void> {
    const p = new Player(this.repo, this.accountId, this.email);
    p.avatar = new Avatar(option.race, option.exp);
    return this.repo.upgradeUserToPlayer(this, p);
  }
}

export class LoginOptions {
  constructor(public email: string, public password: string) {}
}

/**
 * プレイヤーを昇格するオプションを代表するクラス。
 */
export class PlayerUpgradeOption {
  /**
   * プレイヤー昇格オプションのコンストラクタ。
   * @param race アバターの種族
   * @param exp 初期の総計経験値
   */
  constructor(public race: Race, public exp: number = 0) {}
}

export class Player extends User {
  public avatar!: Avatar;

  public get level(): number {
    return this.avatar.level;
  }

  /**
   * プレイヤーをインスタンス化する場合は`New`を使ってください。
   */
  constructor(repo: IAccountRepository, accountId: string, email: string) {
    super(repo, accountId, email);
  }

  public static async New(repo: IAccountRepository, accountId: string, email: string): Promise<Player> {
    const p = new Player(repo, accountId, email);
    p.avatar = await p.repo.getAvatar(p.accountId);
    return p;
  }
}
