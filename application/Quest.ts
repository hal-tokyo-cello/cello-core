import { Quest } from "../core";

/**
 * クエストを取得するリクエストのbody部。
 */
export interface QuestSummaryRequest {}

type QuestSummary = Pick<Quest, "title" | "experience"> & { genre: string };

/**
 * クエストを取得したレスポンスのbody部。
 */
export interface QuestSummaryResponse {
  /**
   * クエストの要約
   */
  quest: QuestSummary;
}

/**
 * クエストのリストを取得するリクエストのbody部。
 */
export interface QuestSummaryListRequest {}

/**
 * クエストのリストを取得したレスポンスのbody部。
 */
export interface QuestSummaryListResponse {
  /**
   * クエストの要約。
   */
  quests: QuestSummary[];
}
