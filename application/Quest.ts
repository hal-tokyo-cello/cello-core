/**
 * クエストを取得するリクエストのbody部。
 */
export interface QuestRequest {}

interface QuestSimple {
  /**
   * クエストのタイトル
   */
  title: string;
  /**
   * クエストを突破して得られる経験値
   */
  exp: number;
  /**
   * クエストのジャンル
   */
  genre: string;
}

/**
 * クエストを取得したレスポンスのbody部。
 */
export interface QuestResponse {
  /**
   * クエストの要約
   */
  quest: QuestSimple;
}

/**
 * クエストのリストを取得するリクエストのbody部。
 */
export interface QuestListRequest {}

/**
 * クエストのリストを取得したレスポンスのbody部。
 */
export interface QuestListResponse {
  /**
   * クエストの要約。
   */
  quests: QuestSimple;

}
