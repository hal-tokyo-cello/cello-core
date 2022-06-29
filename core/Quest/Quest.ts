import { Answer, CombinationAnswer, Item } from "core";

/**
 * クエストを代表する抽象クラス。
 */
export abstract class Quest {
  /**
   * クエストの解答
   */
  protected solution: Answer;
  /**
   *問題文
   */
  public problem: string = "";

  /**
   * クエストのコンストラクタ。
   * @param id クエストId
   * @param title クエストのタイトル
   * @param drops クエストのドロップアイテム
   * @param experience クエストを突破して得られる経験値
   * @param option クエストの解答群
   * @param solution クエストの正解が解答群における添え字
   */
  constructor(
    public id: number,
    public title: string,
    public drops: Item[],
    public experience: number,
    public option: Answer[],
    solution: number,
    problem: string
  ) {
    this.solution = option[solution];
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
   * ４択問題クラスのコンストラクタ。
   * @param id クエストId
   * @param title クエストのタイトル
   * @param drops クエストのドロップアイテム
   * @param experience クエストを突破して得られる経験値
   * @param option クエストの解答群
   * @param solution クエストの正解が解答群における添え字
   * @param problem 問題文、配列として持たせるなら書き換える
   */
  constructor(
    id: number,
    title: string,
    drops: Item[],
    experience: number,
    option: Answer[],
    solution: number,
    problem: string
  ) {
    super(id, title, drops, experience, option, solution, problem);
  }

  /**
   * ランダムに問題整列をさせる
   */
  public questionShuffle(): Answer[] {
    for (let i = this.option.length - 1; 0 < i; i--) {
      // 0〜(i+1)の範囲で値を取得
      let r = Math.floor(Math.random() * (i + 1));

      // 要素の並び替えを実行
      let tmp = this.option[i];
      this.option[i] = this.option[r];
      this.option[r] = tmp;
    }
    return this.option;
  }
}

/**
 * 組み合わせ問題を代表するクラス。
 */
export class CombinationQuestion extends Quest {
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
    option: Answer[],
    solution: number,
    problem: string
  ) {
    super(id, title, drops, experience, option, solution, problem);
  }

  /**
   * オーバーロード
   * @param answer
   * @returns
   */
  public override answer(answer: CombinationAnswer): boolean {
    return answer.value === this.solution.value; //this.answer2string([]);
  }

  /**
   * 配列組み合わせ関数
   * @return string some
   */
  public answer2string(ans: Answer[]): string {
    let ret: number[] = [];

    for (const a of ans) {
      let i = 0;
      for (let j = 0; j < this.option.length; j++) {
        const src = this.option[j];
        if (src.value === a.value) {
          i = j;
          break;
        }
      }
      ret = [...ret, i];
    }

    return ret.join(",");
  }
}
