# frontend

Next.js (App Router / TypeScript) 製のフロントエンドアプリケーション。

## ディレクトリ構成

```
frontend/
├── src/
│   ├── app/            # ルーティング（App Router）
│   │   ├── (auth)/     # 認証系ページ（ログイン・登録）route group
│   │   └── (main)/     # ログイン後のメイン画面 route group
│   ├── components/     # 汎用UIコンポーネント
│   │   ├── ui/          # ボタン・カードなど最小単位の見た目コンポーネント
│   │   └── layout/      # ヘッダー・フッターなどレイアウト用コンポーネント
│   ├── features/       # 機能（ドメイン）単位のコンポーネント・ロジック
│   │   ├── cats/        # 猫プロフィール関連
│   │   ├── photos/      # 写真アップロード・一覧関連
│   │   └── auth/        # 認証関連
│   ├── hooks/          # カスタムフック
│   ├── lib/            # APIクライアントなど外部連携・共通処理
│   ├── types/          # 型定義
│   └── styles/         # グローバルスタイル
└── public/             # 静的ファイル
```

## 採用理由

- **App Router + route group**: `(auth)` `(main)` のようにroute groupでURLに影響を与えずに
  レイアウトや認可の境界を分離できるため、認証必須ページと公開ページの見通しが良くなります。
- **components/ と features/ の分離**: 見た目のみに責務を持つ再利用可能なUI部品（components/ui）と、
  「猫」「写真」といったドメインに紐づくロジック・部品（features/*）を分けることで、
  機能追加時の影響範囲を局所化しやすくしています。
- **lib/ にAPIクライアントを集約**: Laravel APIとの通信部分を1箇所にまとめ、
  エンドポイント変更や認証ヘッダー付与などの変更に強くしています。

## Docker

`Dockerfile` はNext.jsアプリをコンテナ化するためのひな形です。実装フェーズでNode.jsのバージョンや
ビルド・起動コマンドを確定させます。
