export * from "./Avatar";
export * from "./User";

import { Identifier } from "index";
import { Avatar } from "./Avatar";
import { Player, User } from "./User";

export interface IAccountRepository {
  getUser(id: Identifier): User;
  getPlayer(id: Identifier): Player;
  getAvatar(id: Identifier): Avatar;
}
