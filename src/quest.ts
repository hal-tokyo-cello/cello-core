export type Identifier = number | string;

export interface IQuestRepository {
  getQuest: (id: Identifier) => Quest;
  getAnswer: (id: Identifier) => Answer;
  getItem: (id: Identifier) => Item;
}

export abstract class Quest {}

export abstract class Answer {}
export abstract class Item {}
