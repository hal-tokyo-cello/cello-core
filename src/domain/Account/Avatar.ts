import { IAccountRepository, Player } from "domain/Account";

export enum Race {
  Egg,
  Plant,
}

export class Avatar {
  constructor(public repo: IAccountRepository, public player: Player, public race: Race) {}
}
