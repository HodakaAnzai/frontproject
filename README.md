# アプリ概要  
## 学生の本音を見れる大学口コミサイトを開発しました！  
![スクリーンショット 2024-12-29 185049](https://github.com/user-attachments/assets/c736981b-25b6-4da2-9f45-7e759e7b6575)
## いいねの逆の悪いねを導入！
#### 悪いねが多くおるほど、難解な講義であったり、クセのある講義かどうかが一目でわかる！
## 機能一覧　　
### 検索機能・フィルター機能
![スクリーンショット 2024-12-29 190715](https://github.com/user-attachments/assets/0c6651f2-fd9a-4e21-87ca-fa215fc05b58)  
#### 検索欄にキーワードを入力したり、プルダウンから項目を選択すると授業を絞れます！  



### 授業追加・授業編集機能
![スクリーンショット 2024-12-29 191454](https://github.com/user-attachments/assets/4058c7bc-b107-4800-9442-48b6437994da)
#### 授業を追加したり、投稿した授業内容を編集可能！　



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
