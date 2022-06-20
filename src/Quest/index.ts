export * from "./Answer";
export * from "./Effect";
export * from "./Item";
export * from "./Quest";

import { Identifier } from "index";
import { Answer } from "./Answer";
import { Item } from "./Item";
import { Quest } from "./Quest";

export interface IQuestRepository {
  getQuest: (id: Identifier) => Quest;
  getAnswer: (id: Identifier) => Answer;
  getItem: (id: Identifier) => Item;
}
