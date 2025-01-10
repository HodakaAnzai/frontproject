# アプリ概要  


# 環境構築  
1. dockerdesktopアプリを立ち上げる(アプリを起動するだけ)  

2. docker-compose up --buildを入力 (立ち上げに時間がかかる)
```
docker-compose up -d --build
```  

3.起動完了したら http://localhost:3001/ にアクセスできたら成功！  

*終わるとき!! vscodeで新しくターミナルを開いてこのコマンドを入力！！！ 
```
docker-compose down
```  

何かあった時 Docker version 27.3.1, build ce12230がかえってくれば問題なし 返って来ないときはdockerdesktopアプリが起動出来てないか、またはdockerdesktopアプリ自体がインストールされてないかも？
