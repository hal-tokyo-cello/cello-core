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
   * クエストを回答する。
   * @param answer クエストへの回答
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
   *問題文
   */
  public problem: string = "";

  /**
   * ４択問題クラスのコンストラクタ。
   * @param id クエストId
   * @param title クエストのタイトル
   * @param drops クエストのドロップアイテム
   * @param experience クエストを突破して得られる経験値
   * @param answers クエストの解答群
   * @param solution クエストの正解が解答群における添え字
   * @param problem 問題文、配列として持たせるなら書き換える
   */
  constructor(
    id: number,
    title: string,
    drops: Item[],
    experience: number,
    answers: Answer[],
    solution: number,
    problem: string
  ){
    super(id, title, drops, experience, answers, solution)
  }

  /**
   * ランダムに問題整列をさせる
   */
  public questionShuffle() {

    for(let i = (this.answers.length - 1); 0 < i; i--){
      // 0〜(i+1)の範囲で値を取得
      let r = Math.floor(Math.random() * (i + 1));
  
      // 要素の並び替えを実行
      let tmp = this.answers[i];
      this.answers[i] = this.answers[r];
      this.answers[r] = tmp;
    }
    return this.answers;
  }

}

 /**
  * 組み合わせ問題を代表するクラス。
  */
export class CombinationQuestion extends Quest {

  /**
   *問題文
   */
  public problem: string = "";

  /**
   * 組み合わせ問題クラスのコンストラクタ。
   * @param id クエストId
   * @param title クエストのタイトル
   * @param drops クエストのドロップアイテム
   * @param experience クエストを突破して得られる経験値
   * @param answers クエストの解答群
   * @param solution クエストの正解が解答群における添え字
   * @param problem 問題文、配列として持たせるなら書き換える
   */
   constructor(
    id: number,
    title: string,
    drops: Item[],
    experience: number,
    answers: Answer[],
    solution: number,
    problem: string
  ){
    super(id, title, drops, experience, answers, solution)
  }

  /**
   * オーバーロード
   * @param answer 
   * @returns 
   */
  public override answer(answer: Answer): boolean {
    return answer.value === this.answer2string([]);
  }

  /**
   * 配列組み合わせ関数
   * @return string some
   */
   public answer2string(ans: Answer[]){
  
    let ret:number[] = []

    for (const a of ans) {
      let i = 0;
      for (let j = 0; j < this.answers.length; j++) {
        const src = this.answers[j]
        if (src.value === a.value) {
          i = j
          break;
        }
      }
      ret = [...ret, i]
    }

    return ret.join(",")
  }

}
