# API_NOTES.md：Gemini API 調査メモ

## 使用API
- Gemini API（Google AI）
- 公式ドキュメント：https://ai.google.dev/gemini-api/docs

## 使用モデル
- `gemini-2.5-flash`
- 安定版モデル（Stable）
- 音声・テキスト対応
- 公式モデル一覧：https://ai.google.dev/gemini-api/docs/models?hl=ja

## 音声サポート形式
- WAV / MP3 / AIFF / AAC / OGG / FLAC
- m4aはAAC形式として送信（mime_type: audio/aac）
- 公式：https://ai.google.dev/gemini-api/docs/audio

## 制限・注意事項
- inline_dataの場合：リクエスト全体が20MB以下であること
- 無料枠：gemini-2.5-flash は1分10リクエスト・1日500リクエストまで
- APIキーはlocalStorageに保存（コードへの直書き禁止）
- 無料枠の場合、入力データがGoogleの改善に使われる可能性あり

## リクエスト形式（文字起こし）
- 音声をBase64に変換してinline_dataで送信
- mime_typeを正確に指定する必要あり

## レート制限参考
- 公式：https://ai.google.dev/gemini-api/docs/rate-limits