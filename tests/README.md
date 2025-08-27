# テスト環境について

このプロジェクトでは、Nuxt Test Utilsを使用してテストを実装しています。

## テストの構成

テストは以下のディレクトリ構造で管理されています：

```
tests/
├── app/      # アプリケーション（フロントエンド）のテスト
├── server/   # サーバーサイドのテスト
└── README.md # このファイル
```

## テストの実行方法

以下のコマンドでテストを実行できます：

```bash
# すべてのテストを実行
npm test

# テストをウォッチモードで実行（ファイル変更時に自動実行）
npm run test:watch

# カバレッジレポートを生成
npm run test:coverage
```

## テストの作成方法

### コンポーネントテスト

`tests/app/` ディレクトリにコンポーネントのテストを作成します。

```typescript
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import YourComponent from '~/app/components/YourComponent.vue'

describe('YourComponent', () => {
  it('コンポーネントが正しくレンダリングされる', async () => {
    const component = await mountSuspended(YourComponent)
    // テストコード
  })
})
```

### APIテスト

`tests/server/` ディレクトリにAPIのテストを作成します。

```typescript
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('API Tests', () => {
  beforeEach(async () => {
    await setup({
      server: true,
    })
  })

  it('APIエンドポイントが正常に動作する', async () => {
    const response = await $fetch('/api/your-endpoint')
    // テストコード
  })
})
```

## 参考リンク

- [Nuxt Test Utils ドキュメント](https://nuxt.com/docs/getting-started/testing)
- [Vitest ドキュメント](https://vitest.dev/) 
