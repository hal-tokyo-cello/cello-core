import { Avatar, Player, User } from "domain/Account";
import { Answer, Item, Quest } from "domain/Quest";

export type Identifier = string | number;

export interface IQuestRepository {
  getQuest: (id: Identifier) => Quest;
  getAnswer: (id: Identifier) => Answer;
  getItem: (id: Identifier) => Item;
}

export interface IAccountRepository {
  getUser(id: Identifier): User;
  getUserPassword(id: Identifier): Promise<string>;
  getPlayer(id: Identifier): Player;
  getAvatar(id: Identifier): Avatar;

  setLastLoginAttempt(timestamp: number): void;
  setLastLogin(timestamp: number): void;
  registerNewUser(user: User): void;
}
