import { Item } from "domain/Quest";

export enum Race {
  Egg,
  Plant,
}

export class Avatar {
  /**
   * Level function is `50x ^ 2`.
   */
  public get level(): number {
    return this.totalExp == 0 ? 0 : Math.sqrt(this.totalExp / 50);
  }

  constructor(public race: Race, public totalExp: number) {}

  public applyItem(...items: Item[]): void {
    items.forEach((item) => {
      item.takeEffect();
    });
  }
}
