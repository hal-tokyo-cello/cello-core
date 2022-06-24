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
