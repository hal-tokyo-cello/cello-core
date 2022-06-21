import { Player } from "core";
import { IAccountRepository } from "infrastructure";

export enum Race {
  Egg,
  Plant,
}

export class Avatar {
  constructor(public repo: IAccountRepository, public player: Player, public race: Race) {}
}