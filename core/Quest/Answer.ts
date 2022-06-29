import { CombinationQuestion } from "./Quest";

/**
 * クエストの解答を代表する抽象クラス。
 */
export abstract class Answer {
  /**
   * 解答クラスのコンストラクタ。
   * @param value 解答の値、比較に使う
   * @param display 比較の表示文字列
   */
  constructor(public value: string, public display: string) {}
}

/**
 * 組み合わせ問題の解答クラス
 */
export class CombinationAnswer extends Answer {
  /**
   * 組み合わせ選択肢のコンストラクタ
   * @param parts
   * @param value
   */
  constructor(display: string, quest: CombinationQuestion, ...answers: Answer[]) {
    super(quest.answer2string(answers), display);
  }

  /**
   * 配列組み合わせ関数
   * @return string some
   */
  public static answers2string(ans: Answer[]): string {
    return "";
  }
}
