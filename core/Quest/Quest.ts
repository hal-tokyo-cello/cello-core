import { Answer, Item } from "core";

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
   * @param id クエストId
   * @param title クエストのタイトル
   * @param drops クエストのドロップアイテム
   * @param experience クエストを突破して得られる経験値
   * @param answers クエストの解答群
   * @param solution クエストの正解が解答群における添え字
   */
  constructor(
    public id: number,
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
export class MultipleChoiceQuestion extends Quest {

  /**
   *@param problem 問題文、配列として持たせるなら書き換える
   *@param questionValue 4択質問、要素に解答を持たせる、中身はDBによるか or コードで持つか
   *@param answerFlag
   */
  public problem: string = "";
  public questionValue: Array<string> = [];
  public answerFlag: boolean = false;

  /**
   * ランダムに問題整列をさせる
   * これはビジネスロジックではない？実際にUIに適応化させるのはapplication層？
   */
  public questionShuffle() {
    for(let i = (this.questionValue.length - 1); 0 < i; i--){
      // 0〜(i+1)の範囲で値を取得
      let r = Math.floor(Math.random() * (i + 1));
  
      // 要素の並び替えを実行
      let tmp = this.questionValue[i];
      this.questionValue[i] = this.questionValue[r];
      this.questionValue[r] = tmp;
    }
    return this.questionValue;
  }

  /**
   * 回答する
   * 正誤判定関数実行UI処理はapplication層？
   * 解答一致は親クラスに投げる or それか各子クラスごとに一致処理させる？←親にまとめるとなると要らない気がする
   * 選択された時の回答flagだけtrueで投げておく
   */
   public questionJudge() {
  
    if(this.questionValue != null){
      return this.answerFlag = true;
    }
  }

  /**
   * ４択問題クラスのコンストラクタ。
   * オーバライドで再定義は保留
   */

}

 /**
  * 組み合わせ問題を代表するクラス。
  */
export class CombinationQuestion extends Quest {

  /**
   *@param 問題文
   *@param 回答の組み合わせ配列　null許容
   *@param answerFlag
   */
  public problem: string = "";
  public combineStr?: Array<string>;
  public answerFlag: boolean = false;

  /**
   * 問題をダウンロードさせる
   * これはビジネスロジックに入る？プレゼンテーション層な気がする
   */

  /**
   * 配列要素を組み合わせる
   */


  /**
   * 回答する
   */
   public questionJudge() {
  
    if(this.combineStr != null){
      return this.answerFlag = true;
    }
  }

  /**
   * 組み合わせ問題クラスのコンストラクタ。
   * オーバライドで再定義は保留
   */

}
