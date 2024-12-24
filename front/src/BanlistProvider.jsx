import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

// BanlistContext の作成
export const BanlistContext = createContext();

// BanlistProvider コンポーネント
export const BanlistProvider = ({ children }) => {
  const [banlist, setBanlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanlist = async () => {
      try {
        console.log("APIリクエスト開始");

        const response = await fetch("http://localhost:8080/wsp-example/api/banlistapi", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("レスポンス取得完了");

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData.error || "エラーが発生しました");
          setError("データを取得できませんでした");
          return;
        }

        const data = await response.json();
        console.log("取得したデータ:", data);
        setBanlist(data); // レスポンスをステートに保存
      } catch (err) {
        console.error("サーバーに接続できませんでした:", err);
        setError("サーバーに接続できませんでした");
      }
    };

    fetchBanlist(); // 初回マウント時にAPIを呼び出し
  }, []);

  return (
    <BanlistContext.Provider value={{ banlist, error }}>
      {children}
    </BanlistContext.Provider>
  );
};

BanlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
