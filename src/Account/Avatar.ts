import { IAccountRepository, Player } from "Account";

export enum Race {
  Egg,
  Plant,
}

export class Avatar {
  constructor(public repo: IAccountRepository, public player: Player, public race: Race) {}
}
