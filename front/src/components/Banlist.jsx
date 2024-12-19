import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BanList.css";

const Banlist = () => {
  const homenavigate = useNavigate();

  useEffect(() => {
    const checkEmail = async () => {
      const email = "22fi008@ms.dendai.ac.jp"; // テスト用の固定メールアドレス

      try {
        console.log("APIリクエスト開始");

        const response = await fetch("http://localhost:8080/wsp-example/api/check-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `email=${encodeURIComponent(email)}`, // メールアドレスを送信
        });

        console.log("レスポンス取得完了");

        if (!response.ok) {
          // エラーレスポンスの場合
          const errorData = await response.json();
          console.error("Error:", errorData.message || "エラーが発生しました");
          return;
        }

        // 正常なレスポンスの場合
        const data = await response.json();
        console.log("結果:", data);
      } catch (err) {
        // ネットワークエラーなどの例外処理
        console.error("サーバーに接続できませんでした:", err);
      }
    };

    checkEmail(); // コンポーネントがマウントされたときにAPIを呼び出す
  }, []); // 依存配列を空にして初回マウント時のみ実行

  return (
    <>
      <div className="buttonArea">
        <button className="returnButton" onClick={() => homenavigate("/")}>
          ≺
        </button>
      </div>
      <div className="banlistArea">
        <h1>Banリスト</h1>
        <ul>
          <Ban />
        </ul>
      </div>
    </>
  );
};

export const Ban = () => {
  return (
    <div className="ban">
      <AccountCircleIcon />
      <h3>管理用ID</h3>
    </div>
  );
};

export default Banlist;
