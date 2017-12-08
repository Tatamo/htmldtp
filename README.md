# HTMLDTP
HTML/CSSでレポートかくやつ

簡単にいえばWeb組版です

## インストール
``` shell
$ git clone https://github.com/Tatamo/htmldtp.git
$ cd htmldtp
$ npm install
```

## 使い方
gulpから`serve`を実行するとローカルサーバーが起動します

`src/`以下にNunjucks形式でHTMLを記述するとbrowser-syncによりリアルタイムで反映されます

## 組版の表示とPDF化
[Vivliostyle Chrome Extension](https://chrome.google.com/webstore/detail/vivliostyle/ffeiildjegeigkbobbakjjmfeacadbne) をインストールしたChromeで`dist/`以下に生成されたHTMLファイルを開きます  
Vivliostyle Chrome Extensionを有効化し、Chromeの印刷機能でPDFとして出力してください

このとき、詳細設定から余白をなしに、背景のグラフィックをオンにする必要があります
