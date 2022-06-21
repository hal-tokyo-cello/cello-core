export abstract class Effect {
  public effectDescription: string = "";

  public abstract effect(...options: EffectOption[]): boolean;
}

export abstract class EffectOption {}
