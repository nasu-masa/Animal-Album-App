@../AGENTS.md
@../CLAUDE.md
# Frontend Rules

- Next.js、React、TypeScriptの現在のプロジェクト構成に従う
- Server Componentを基本とし、必要な部分だけClient Componentにする
- `"use client"`をページ全体へ安易に付けない
- `page.tsx`へUI、状態管理、API通信をすべて詰め込まない
- コンポーネントは必要性がある場合に分割する
- 最初から細かすぎるコンポーネント分割をしない
- 同じUIや処理が複数回登場した場合に共通化を検討する
- UIとAPI通信処理を分ける
- API URLをコンポーネントへ直接書かない
- APIのベースURLは環境変数で管理する
- 同じ`fetch`処理を複数箇所へ重複して書かない
- APIレスポンスや画面データにはTypeScriptの型を定義する
- `any`を安易に使用しない
- Optionalと`null`をAPI仕様に合わせて区別する
- 外部データは型だけで安全と判断せず、必要に応じて検証する
- ローディング、エラー、空状態を用意する
- スマートフォンとPCの両方で大きく崩れないようにする
- 画像には適切な`alt`を設定する
- 配列の`index`を理由なく`key`として使用しない
- 不要なライブラリや状態管理ツールを追加しない
- LaravelのAPI仕様をフロント側の都合で勝手に変更しない
- 変更後はTypeScript、ESLint、ビルドまたは対象画面を確認する