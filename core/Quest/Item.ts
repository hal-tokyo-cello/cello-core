import { Effect, EffectOption } from "core";

export abstract class Item {
  public effect: Effect | null;

  constructor(public name: string, public description: string, effect: Effect | null = null) {
    this.effect = effect;
  }

  public takeEffect(...options: EffectOption[]): boolean {
    return this.effect?.effect(options) ?? false;
  }
}
