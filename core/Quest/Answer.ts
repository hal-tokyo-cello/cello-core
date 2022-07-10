/**
 * 答の値を代表する型。
 */
export type AnswerValue = string;

/**
 * クエストの答を代表するクラス。
 */
export class Answer {
  /**
   * 解答クラスのコンストラクタ。
   * @param value 答の内部の値、比較に使う
   * @param display 表示用文字列
   */
  constructor(public value: AnswerValue, public display: string) {}

  /**
   * 答を比較する
   * @param answer 比較する答のオブジェクト
   */
  public compare(answer: Answer): boolean {
    return this.value === answer.value;
  }
}
