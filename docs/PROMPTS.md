# PROMPTS.md：AIへの重要指示とその結果

## PROMPT-01：仕様策定
**指示内容：**
講義音声ノートAIの仕様書（SPEC.md）を作成してほしい。
Gemini APIを使い、音声から文字起こし・要約・要点を生成するWebアプリ。

**採用した結果：**
SPEC.mdとして保存。画面構成・ユーザー導線・エラー処理・APIキー管理方針を定義した。

---

## PROMPT-02：UIの作成
**指示内容：**
HTML/CSS/JSでスマホ対応のUIを作成してほしい。
APIキー入力・講義名入力・音声ファイル選択・実行ボタン・結果表示エリアを含むこと。

**採用した結果：**
index.htmlとして保存。レスポンシブ対応・コピーボタン付きで実装。

---

## PROMPT-03：Gemini API連携
**指示内容：**
音声ファイルをBase64に変換してGemini APIに送り、文字起こしと要約を取得するmain.jsを作成してほしい。
APIキーはlocalStorageで管理すること。

**採用した結果：**
main.jsとして保存。文字起こし→要約の2段階処理で実装。

**根拠URL：**
https://ai.google.dev/gemini-api/docs/audio

---

## PROMPT-04：モデル名の確認
**指示内容：**
gemini-2.0-flashが非推奨になっていると指摘。最新モデルを公式ドキュメントで確認してほしい。

**採用した結果：**
gemini-2.5-flash（安定版）に変更。

**根拠URL：**
https://ai.google.dev/gemini-api/docs/models?hl=ja

---

## PROMPT-05：429エラーの解決
**指示内容：**
Gemini APIで429エラー（quota limit: 0）が発生。原因と解決方法を調べてほしい。

**採用した結果：**
Google AI Studioで新しいプロジェクトを作成しAPIキーを取り直すことで解決。

**根拠URL：**
https://ai.google.dev/gemini-api/docs/rate-limits