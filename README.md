# inspector-cert-manager

検査員認定を管理するための簡易テストモデルです。

## セットアップ

```bash
npm install
npm run dev
```

## 主な機能

- 管理職ログイン（テスト用）
- 認定情報の登録・編集・削除
- CSV読込による一括更新
- 有効期限アラート表示
- 検査員認定状況のExcel（.xlsx）出力
- 免許証風の個別表示とPDF出力（ブラウザ印刷）

## テスト用ログイン

- `manager1` ～ `manager5`
- パスワード: `test1234`

## CSVヘッダー

```csv
id,inspectorName,employeeCode,department,certificationName,certificationCode,issuedDate,expiryDate,note
```

## GitHub Pages デプロイ

```bash
npm run deploy
```

`vite.config.ts` で `base: '/inspector-cert-manager/'` を設定済みです。
