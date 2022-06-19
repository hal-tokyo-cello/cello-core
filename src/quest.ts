export type Identifier = number | string;

export interface IQuestRepository {
  getQuest: (id: Identifier) => Quest;
  getAnswer: (id: Identifier) => Answer;
  getItem: (id: Identifier) => Item;
}

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
}

export abstract class Answer {
  constructor(public value: string, public display: string) {}
}

export abstract class Item {
  public effect: Effect | null;

  constructor(public name: string, public description: string, effect: Effect | null = null) {
    this.effect = effect;
  }
}

export abstract class Effect {}
