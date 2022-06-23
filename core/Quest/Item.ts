import { Effect, EffectOption } from "core";

/**
 * アイテムを代表する抽象クラス。
 */
export abstract class Item {
  /**
   * アイテムの効果。
   * 効果を持たないアイテムもある。
   */
  public effect: Effect | null;

  /**
   * アイテムのコンストラクタ。
   * @param name アイテム名
   * @param description アイテムの説明文
   * @param effect アイテムの効果
   */
  constructor(public name: string, public description: string, effect: Effect | null = null) {
    this.effect = effect;
  }

  /**
   * 効果を実行する。
   * @param options 効果を実行するためのオプション
   * @returns 効果の実行が成功かどうか
   */
  public takeEffect(...options: EffectOption[]): boolean {
    return this.effect?.effect(options) ?? false;
  }
}
