import { Answer, Avatar, Item, Player, Quest, User } from "core";

export type Identifier = string | number;

export interface IQuestRepository {
  getQuest: (id: Identifier) => Promise<Quest>;
  getAnswer: (id: Identifier) => Promise<Answer>;
  getItem: (id: Identifier) => Promise<Item>;
}

export interface IAccountRepository {
  getUser(id: Identifier): Promise<User>;
  getUserPassword(id: Identifier): Promise<string>;
  getPlayer(id: Identifier): Promise<Player>;
  /**
   * プレイヤーのIDからアバターを取得する。
   * @param player プレイヤーのID
   */
  getAvatar(player: Identifier): Promise<Avatar>;
  /**
   * ユーザーのパスワードを更新する。
   * @param user ユーザーのID
   * @param password 新しいパスワードのハッシュ
   */
  updateUserPassword(user: Identifier, password: string): Promise<void>;

  setLastLoginAttempt(timestamp: number): Promise<void>;
  setLastLogin(timestamp: number): Promise<void>;
  registerNewUser(user: User): Promise<void>;
  upgradeUserToPlayer(user: User, player: Player): Promise<void>;
  unregisterUser(id: Identifier): Promise<void>;
  unregisterPlayer(id: Identifier): Promise<void>;
}
