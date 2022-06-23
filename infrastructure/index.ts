import { Answer, Avatar, Item, Player, Quest, User } from "core";

export type Identifier = string | number;

/**
 * クエスト関連の情報を載っているレポジトリ。
 */
export interface IQuestRepository {
  /**
   * クエストのを取得する。
   * @param id クエストのID
   */
  getQuest(id: Identifier): Promise<Quest>;
  /**
   * 解答を取得する。
   * @param id 解答のID
   */
  getAnswer(id: Identifier): Promise<Answer>;
  /**
   * アイテムを取得する。
   * @param id アイテムのID
   */
  getItem(id: Identifier): Promise<Item>;
}

/**
 * アカウント関連の情報を載っているレポジトリ。
 */
export interface IAccountRepository {
  /**
   * ユーザーを取得する。
   * @param id ユーザーのID
   */
  getUser(id: Identifier): Promise<User>;
  /**
   * ユーザーを格納する。
   * @param user ユーザーオブジェクト
   */
  registerNewUser(user: User): Promise<void>;
  /**
   * ユーザーのパスワードを取得する。
   * @param id ユーザーのID
   */
  getUserPassword(id: Identifier): Promise<string>;
  /**
   * ユーザーのパスワードを更新する。
   * @param user ユーザーのID
   * @param password 新しいパスワードのハッシュ
   */
  updateUserPassword(user: Identifier, password: string): Promise<void>;
  /**
   * プレイヤーを取得する。
   * @param id プレイヤーのID
   */
  getPlayer(id: Identifier): Promise<Player>;
  /**
   * プレイヤーのIDからアバターを取得する。
   * @param player プレイヤーのID
   */
  getAvatar(player: Identifier): Promise<Avatar>;

  /**
   * 最後にログインを試みた時日を記録する。
   * @param timestamp Unixタイムスタンプ
   */
  setLastLoginAttempt(timestamp: number): Promise<void>;
  /**
   * 最後のログイン時日を記録する。
   * @param timestamp Unixタイムスタンプ
   */
  setLastLogin(timestamp: number): Promise<void>;
}
