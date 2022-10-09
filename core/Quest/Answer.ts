import { CombinationQuestion } from "./Quest";

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

const CombinationSolutionDisplay = "solution";

/**
 * 組み合わせ問題の答を代表するクラス。
 */
export class CombinationSolution extends Answer {
  private constructor(value: AnswerValue, display: string) {
    super(value, display);
  }

  /**
   * 答オブジェクトをクエストと整列された答の配列でインスタンス化。
   * @param quest 解答するクエスト
   * @param answers 答として整列した答の配列
   * @returns 答オブジェクト
   */
  public static withQuestNAnswers(quest: CombinationQuestion, answers: Answer[]) {
    return new CombinationSolution(quest.answer2Value(answers), CombinationSolutionDisplay);
  }

  /**
   * 答オブジェクトをクエストと整列された答の配列でインスタンス化。
   * @param options 解答するクエストの解答群
   * @param answers 答として整列した答の配列
   * @returns 答オブジェクト
   */
  public static withOptionsNAnswers(options: Answer[], answers: Answer[]) {
    return new CombinationSolution(
      CombinationQuestion.flattenAnswerValues(options, answers),
      CombinationSolutionDisplay
    );
  }

  /**
   * 答オブジェクトをクエストと整列された答の配列でインスタンス化。
   * @param quest 解答するクエスト
   * @param answers 答として整列した答の配列
   * @returns 答オブジェクト
   */
  public static withQuestNStrings(quest: CombinationQuestion, answers: string[]) {
    return CombinationSolution.withQuestNAnswers(quest, CombinationSolution.strings2Answers(answers));
  }

  /**
   * 答オブジェクトをクエストと整列された答の配列でインスタンス化。
   * @param options 解答するクエストの解答群
   * @param answers 答として整列した答の配列
   * @returns 答オブジェクト
   */
  public static withOptionsNStrings(options: Answer[], answers: string[]) {
    return CombinationSolution.withOptionsNAnswers(options, CombinationSolution.strings2Answers(answers));
  }

  public static withOptionsNIndex(options: Answer[], answers: number[]) {
    return CombinationSolution.withOptionsNAnswers(
      options,
      answers.map((idx) => options[idx])
    );
  }

  private static strings2Answers(str: string[]) {
    return str.map((s) => new Answer(s, ""));
  }
}
