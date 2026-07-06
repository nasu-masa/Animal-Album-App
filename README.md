# Cat Photo App

家族向け猫写真管理アプリ（ポートフォリオ用プロジェクト）。

家族間で猫の写真を共有・整理できるWebアプリケーションです。

## 技術構成

| 領域 | 技術 |
| --- | --- |
| フロントエンド | Next.js (App Router, TypeScript) |
| バックエンド | Laravel (API) |
| データベース | MySQL |
| 開発環境 | Docker / Docker Compose |

## ディレクトリ構成

```
cat-photo-app/
├── frontend/          # Next.js製フロントエンド（画面・UI）
├── backend/           # Laravel製API（ビジネスロジック・DB連携）
├── docker/            # nginx / php / mysql のインフラ設定
├── docs/              # 設計資料（ER図、テーブル仕様書、画面設計書など）
├── docker-compose.yml # 開発環境のコンテナ定義
└── README.md          # 本ファイル
```

- **frontend/**: ユーザーが操作する画面を提供するNext.jsアプリケーション。
  Laravel APIをHTTP経由で呼び出し、画面描画に専念します。
- **backend/**: 認証・データ永続化・ビジネスロジックを担うLaravel製APIサーバー。
  フロントエンドとはREST API（JSON）で通信します。
- **docker/**: nginx・PHP・MySQLなど、特定のアプリに属さないインフラ設定をまとめる場所。
  各アプリ固有のビルド定義（Dockerfile）は `frontend/` `backend/` それぞれに置き、
  横断的なインフラ設定だけをここに集約しています。
- **docs/**: 設計資料置き場。関心事ごとに `api/`（API仕様）・`database/`（ER図・テーブル仕様書）・
  `screens/`（画面遷移図・画面設計書）にまとめています。

フロントエンドとバックエンドを分離しているのは、それぞれを独立してDockerコンテナ化・スケール・デプロイできるようにするためです。

## Docker（予定）

`docker-compose.yml` に frontend / backend / MySQL の各コンテナ定義を用意しています（開発環境用のひな形）。
`docker/` 配下のnginx・PHP・MySQLの設定ファイルは、必要になったタイミングで追加していきます。

## セットアップ（予定）

実装フェーズで以下を追記予定です。

- 環境変数の設定手順
- `docker compose up` によるローカル起動手順
- マイグレーション・シーディング手順
