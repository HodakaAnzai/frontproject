import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BanList.css";

const Banlist = () => {
  const [banlist, setBanlist] = useState([]);
  const [error, setError] = useState(null); // エラーステート追加
  const navigate = useNavigate();

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
          console.log("Error:", errorData.error || "エラーが発生しました");
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

  if (error) {
    return (
      <div className="errorArea">
        <p>{error}</p>
        <button onClick={() => navigate("/")}>戻る</button>
      </div>
    );
  }

  return (
    <>
      <div className="buttonArea">
        <button className="returnButton" onClick={() => navigate("/")}>
          ≺
        </button>
      </div>
      <div className="banlistArea">
        <h1>Banリスト</h1>
        <ul>
          {banlist.length > 0 ? banlist.map((entry, index) => (
            <Ban key={index} id={entry} />
          )) : <h2>Banされたユーザはいません</h2>}
        </ul>
      </div>
    </>
  );
};

export const Ban = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div className="ban" onClick={()=>navigate("/UserDetail",{
      state:{
        userId:id.userId,
      }
    })}>
      <AccountCircleIcon />
      <h2>{id.userId}</h2>
    </div>
  );
};

Ban.propTypes = {
  id: PropTypes.shape({
    userId: PropTypes.string,
  }),
};
export default Banlist;