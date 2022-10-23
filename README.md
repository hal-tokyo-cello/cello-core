# CELLO Core

CELLOのバックエンドとフロントエンドのビジネスロジックをまとめたコアライブラリ

詳しくは[GitHub Page](https://hal-tokyo-cello.github.io/cello-core)を参照してください。

## 機能

- 型の提供

## バックエンド

### 型の提供

```ts
// Quest.ts
import { QuestRequest, QuestResponse } from "cello-core/application";
import { ApiRequest, ApiHandler } from "../types";

export type QuestApiRequest = ApiRequest<QuestRequest>;
export type QuestApiResponse = ApiRequest<QuestResponse>;
export type QuestApi = ApiHandler<QuestRequest, QuestResponse>;
```

```ts
import { QuestApi } from "../library/api/Quest";

const httpTrigger: ExampleApi = async (context, req) => {
  // 実装...
};

export default httpTrigger;
```
