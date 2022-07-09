import { Answer, Item } from "../../core";

/**
 * クエストを代表する抽象クラス。
 */
export abstract class Quest {
  /**
   * クエストの解答
   */
  private solution: Answer;

  /**
   * クエストのコンストラクタ。
   * @param title クエストのタイトル
   * @param drops クエストのドロップアイテム
   * @param experience クエストを突破して得られる経験値
   * @param answers クエストの解答群
   * @param solution クエストの正解が解答群における添え字
   */
  constructor(
    public title: string,
    public drops: Item[],
    public experience: number,
    public answers: Answer[],
    solution: number
  ) {
    this.solution = answers[solution];
  }

  /**
   * クエストを解答する。
   * @param answer クエストへの解答
   * @returns 正解かどうか
   */
  public answer(answer: Answer): boolean {
    return answer.value === this.solution.value;
  }
}

/**
 * 4択問題を代表するクラス。
 */
export class MultipleChoiceQuestion extends Quest {}

/**
 * 組み合わせ問題を代表するクラス。
 */
export class CombinationQuestion extends Quest {}
