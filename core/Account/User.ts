import { Avatar, Race } from "./Avatar";
import crypto from "crypto";
import { IAccountRepository } from "infrastructure";

/**
 * ユーザーを代表する抽象クラス。
 */
export abstract class User {
  /**
   * ユーザーのパスワード。デフォルトはnull、必要の場合はrepoから取得する。
   */
  public password?: string;

  /**
   * ユーザークラスのコンストラクタ。
   * @param repo アカウント関連の情報を載っているレポジトリ
   * @param accountId アカウントを表すID
   * @param email アカウントのメールアドレス
   */
  constructor(public repo: IAccountRepository, public accountId: string, public email: string) {}

  /**
   * ユーザーをログインする。
   * @param options ログインのオプション
   * @returns 成功する場合はtrue; 失敗の場合はfalse
   */
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

  /**
   * パスワードをハッシュ化する。
   * @param password 未処理のパスワード
   * @returns ハッシュ化したパスワード
   */
  public static hashPassword(password: string): string {
    return crypto.createHash("sha256", {}).update(password).digest("hex");
  }

  /**
   * 新規ユーザーを登録する。
   * @param repo アカウント関連の情報を載っているレポジトリ
   * @param email 新規ユーザーのメールアドレス
   * @param password 新規ユーザーのパスワード
   * @returns
   */
  public static register(repo: IAccountRepository, email: string, password: string): Promise<void> {
    password = this.hashPassword(password);
    return Promise.resolve(
      repo.registerNewUser({ repo: repo, accountId: "", email: email, password: password } as User)
    );
  }

  /**
   * ユーザーのパスワードを更新する。
   * 前回と同様のパスワードに指定した場合は失敗する。
   * @param password 新しいパスワード
   * @returns 成功する場合はtrue; 失敗する場合はfalse
   */
  public async updatePassword(password: string): Promise<boolean> {
    this.password = this.password ?? (await this.repo.getUserPassword(this.accountId));

    password = User.hashPassword(password);

    if (password === this.password) {
      return false;
    }

    this.repo.updateUserPassword(this.accountId, password);
    return true;
  }

  /**
   * ユーザーをプレイヤーに昇進する。
   * @param avatar 選択されたアバター
   * @returns 昇進するプレイヤー
   */
  public upgradeToPlayer(option: PlayerUpgradeOption): Promise<void> {
    const p = new Player(this.repo, this.accountId, this.email);
    p.avatar = new Avatar(option.race, option.exp);
    return this.repo.upgradeUserToPlayer(this, p);
  }
}

/**
 * ログインのオプションを代表するクラス。
 */
export class LoginOptions {
  /**
   * ログインオプションクラスのコンストラクタ
   * @param email ユーザーのメールアドレス
   * @param password ユーザーのパスワード
   */
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

/**
 * プレイヤーを代表するクラス。
 */
export class Player extends User {
  /**
   * プレイヤーが育成しているアバター
   */
  public avatar!: Avatar;

  /**
   * プレイヤーのレベル、アバターと同じ
   */
  public get level(): number {
    return this.avatar.level;
  }

  /**
   * プレイヤークラスのコンストラクタ。
   * プレイヤーをインスタンス化する場合は`New`を使ってください。
   * @param repo アカウント関連の情報を載っているレポジトリ
   * @param accountId アカウントのID
   * @param email メールアドレス
   */
  constructor(repo: IAccountRepository, accountId: string, email: string) {
    super(repo, accountId, email);
  }

  /**
   * プレイヤーをインスタンス化する静的メソッド。
   * プレイヤーをインスタンス化するにはコンストラクタではなく、`New`を使用すべき。
   * @param repo アカウント関連の情報を載っているレポジトリ
   * @param accountId アカウントのID
   * @param email メールアドレス
   * @returns インスタンス化したプレイヤー
   */
  public static async New(repo: IAccountRepository, accountId: string, email: string): Promise<Player> {
    const p = new Player(repo, accountId, email);
    p.avatar = await p.repo.getAvatar(p.accountId);
    return p;
  }
}
