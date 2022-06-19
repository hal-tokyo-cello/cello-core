export * from "./Answer";
export * from "./Effect";
export * from "./Item";
export * from "./Quest";

import { Answer } from "./Answer";
import { Item } from "./Item";
import { Quest } from "./Quest";

export type Identifier = number | string;

export interface IQuestRepository {
  getQuest: (id: Identifier) => Quest;
  getAnswer: (id: Identifier) => Answer;
  getItem: (id: Identifier) => Item;
}
