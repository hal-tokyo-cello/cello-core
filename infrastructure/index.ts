import { Quest, Answer, Item, User, Player, Avatar } from "core";

export type Identifier = string | number;

export interface IQuestRepository {
  getQuest: (id: Identifier) => Promise<Quest>;
  getAnswer: (id: Identifier) => Promise<Answer>;
  getItem: (id: Identifier) => Promise<Item>;
}

export interface IAccountRepository {
  getUser(id: Identifier): Promise<User>;
  getPlayer(id: Identifier): Promise<Player>;
  getAvatar(id: Identifier): Promise<Avatar>;

  setLastLoginAttempt(timestamp: number): Promise<void>;
  setLastLogin(timestamp: number): Promise<void>;
  registerNewUser(user: User): Promise<void>;
}
