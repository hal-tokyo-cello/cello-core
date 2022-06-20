import { Answer, Item } from "domain/Quest";

export abstract class Quest {
  private solution: Answer;

  constructor(
    public title: string,
    public drops: Item[],
    public experience: number,
    public answers: Answer[],
    solution: number
  ) {
    this.solution = answers[solution];
  }

  public answer(answer: Answer): boolean {
    return answer.value === this.solution.value;
  }
}

export class MultipleChoiceQuestion extends Quest {}

export class CombinationQuestion extends Quest {}
