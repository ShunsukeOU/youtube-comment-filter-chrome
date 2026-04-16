# YouTube Comment Filter

YouTubeのコメント欄から不快なキーワードや日本語以外の言語のコメントを自動で非表示にし、快適な視聴環境を提供する軽量なChrome拡張機能です。

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Available-blue?logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/youtube-comment-filter/ejpeehceebhgkadkhncpadpcinnejfkc)

## Features

*   **言語フィルター:** 日本語が含まれないコメントを自動的に非表示にします（ON/OFF切替可能）。
*   **基本キーワードフィルター:** あらかじめ設定された不快な言葉を非表示にします。単語ごとに個別に有効/無効の切り替えが可能です。
*   **カスタムキーワード:** ユーザー自身で非表示にしたいキーワードを自由に追加・削除できます。
*   **リアルタイム反映:** 設定を変更すると、ページをリロード（再読み込み）することなく、即座にコメント欄に反映されます。
*   **超軽量・低メモリ消費:** 外部フレームワークを一切使用せず、Vanilla JSで構築されているため、比較的軽量です。

## Tech Stack

*   **HTML / CSS**
*   **Vanilla JavaScript**
*   **Chrome Extensions API**
*   **DOM API**

## インストール方法 (Installation)

### 通常利用
最も簡単な方法です。以下のリンクからChromeに追加してください。

**[Chrome Web Storeからインストールする](https://chromewebstore.google.com/detail/youtube-comment-filter/ejpeehceebhgkadkhncpadpcinnejfkc)**

---

### 開発者・カスタマイズしたい方（ローカルでの導入手順）

ご自身でコードを検証したり、自由に改造して使いたい場合は、以下の手順でローカル環境に導入できます。

#### 1. リポジトリのクローン
このリポジトリを `git clone` するか、ZIPファイルをダウンロードして解凍します。
```bash
git clone [https://github.com/あなたのユーザー名/youtube-comment-filter.git](https://github.com/あなたのユーザー名/youtube-comment-filter.git)
```

#### 2. Chromeに読み込む

1. Chromeブラウザを開き、URLバーに `chrome://extensions/` と入力して拡張機能の管理画面を開きます。
2. 画面右上にある「デベロッパー モード」のスイッチをオンにします。
3. 画面左上に現れる「パッケージ化されていない拡張機能を読み込む」をクリックします。
4. 手順1で（解凍）した `youtube-comment-filter` フォルダを選択します。

## ファイル構成

コードを改造したい方向けのファイル構成の簡単な説明です。

*   `manifest.json`: 権限や読み込む拡張機能の設定ファイル
*   `content.js`: YouTubeのページ上で直接動作するコアスクリプト（独自の判定ロジックを追加したい場合はここを編集してください）
*   `popup.html`: 拡張機能アイコンをクリックした時に開く設定画面のUI
*   `popup.js`: 入力されたNGワードの保存や、ON/OFFトグルの状態を `chrome.storage` に保存するためのファイル


---

2026.04.05 Shunsuke Taira




