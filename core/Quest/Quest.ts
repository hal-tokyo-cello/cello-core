import { Answer, Item } from "../../core";
import { Identifier } from "../../infrastructure";

/**
 * クエスト（問題）を代表する抽象クラス。
 */
export abstract class Quest {
  /**
   * クエストのコンストラクタ。
   * @param id クエストId
   * @param title クエストのタイトル
   * @param drops クエストのドロップアイテム
   * @param experience クエストを突破して得られる経験値
   * @param options クエストの解答群
   * @param solution クエストの解答
   * @param problem 問題文
   */
  constructor(
    public id: Identifier,
    public title: string,
    public drops: Item[],
    public experience: number,
    public options: Answer[],
    public solution: Answer,
    public problem: string
  ) {}

  /**
   * クエストを回答する。
   * @param answer クエストへの回答
   * @returns 正解かどうか
   */
  public answer(answer: Answer): boolean {
    return answer.value === this.solution.value;
  }

  /**
   * 解答群をランダムに整列して返す。内部に保存されたデータは整列されない。
   */
  public shuffleOptions(): Answer[] {
    return [...this.options].sort(() => Math.random() - 0.5);
  }
}

/**
 * 4択問題を代表するクラス。
 */
export class MultipleChoiceQuestion extends Quest {
  /**
   * ４択問題クラスのコンストラクタ。
   * @param id クエストID
   * @param title クエストのタイトル
   * @param drops クエストのドロップアイテム
   * @param experience クエストを突破して得られる経験値
   * @param options クエストの解答群
   * @param solution クエストの解答が解答群における添え字
   * @param problem 問題文
   */
  constructor(
    id: number,
    title: string,
    drops: Item[],
    experience: number,
    options: Answer[],
    solution: number,
    problem: string
  ) {
    super(id, title, drops, experience, options, options[solution], problem);
  }
}

/**
 * 組み合わせ問題を代表するクラス。
 */
export class CombinationQuestion extends Quest {
  constructor(
    id: number,
    title: string,
    drops: Item[],
    experience: number,
    options: Answer[],
    solution: Answer[],
    problem: string
  ) {
    const solutionObj = new Answer(CombinationQuestion.flattenAnswerValues(options, solution), "solution");

    super(id, title, drops, experience, options, solutionObj, problem);
  }

  public static flattenAnswerValues(options: Answer[], answers: Answer[]): string {
    return answers.map((a) => options.findIndex((o) => o.value === a.value)).join("|");
  }

  /**
   * 配列組み合わせ関数
   * @return string some
   */
  public answer2string(answers: Answer[]): string {
    return CombinationQuestion.flattenAnswerValues(this.options, answers);
  }
}
