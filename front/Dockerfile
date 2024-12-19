# Vite のビルドを行うステージ
FROM node:18 AS build

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# Vite のビルドを実行
RUN npm run build

# -----
# 配信用のステージ (Apache を使用)
FROM httpd:latest

# Apache サーバーにビルド成果物をコピー
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

# ポートを公開
EXPOSE 80
CMD ["httpd", "-D", "FOREGROUND"]
