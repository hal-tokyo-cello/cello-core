import { Quest } from "core";

export interface QuestSummaryRequest {}

type QuestSummary = Pick<Quest, "title" | "experience">;

export interface QuestSummaryResponse {
  quest: QuestSummary;
}

export interface QuestSummaryListRequest {}

export interface QuestSummaryListResponse {
  quests: QuestSummary;
}
