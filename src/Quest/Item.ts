import { Effect } from "Quest";

export abstract class Item {
  public effect: Effect | null;

  constructor(public name: string, public description: string, effect: Effect | null = null) {
    this.effect = effect;
  }
}
