import { Item } from "../../core";

/**
 * アバターの種族。
 */
export enum Race {
  Egg,
  Plant,
}

/**
 * アバターを代表するクラス。
 */
export class Avatar {
  /**
   * アバターのレベル。経験値換算関数は`50x ^ 2`.
   */
  public get level(): number {
    return this.totalExp == 0 ? 0 : Math.sqrt(this.totalExp / 50);
  }

  /**
   * アバターは進化可能かどうか。
   */
  public get canEvolve(): boolean {
    return this.level >= 10;
  }

  /**
   * アバタークラスのコンストラクタ。
   * @param race アバターの種族
   * @param totalExp アバターの総計経験値
   */
  constructor(public race: Race, public totalExp: number) {}

  /**
   * アイテムをアバターに使用する。
   * @param items 使うアイテム
   */
  public applyItem(...items: Item[]): void {
    items.forEach((item) => {
      item.takeEffect();
    });
  }
}
