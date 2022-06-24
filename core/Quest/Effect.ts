/**
 * アイテムの効果を代表する抽象クラス。
 */
export abstract class Effect {
  /**
   * 効果の説明文。
   */
  public effectDescription: string = "";

  /**
   * 効果を実行する。
   * @param options 効果を実行するに必要のオプション
   */
  public abstract effect(...options: EffectOption[]): boolean;
}

/**
 * アイテムの効果のオプションを代表する抽象クラス。
 */
export abstract class EffectOption {}
