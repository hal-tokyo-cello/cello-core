export interface QuestRequest {}

interface QuestSimple {
  title: string;
  exp: number;
  genre: string;
}

export interface QuestResponse {
  quest: QuestSimple;
}

export interface QuestListRequest {}

export interface QuestListResponse {
  quests: QuestSimple;
}
