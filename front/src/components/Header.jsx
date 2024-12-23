import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginProvider";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { logininfo} = useContext(LoginContext);

  const handleButtonClick = () => {
    if (logininfo) {
      // ログアウト処理
      navigate("/logout");
    } else {
      // ログイン画面に遷移
      navigate("/loginpass");
    }
  };

  return (
    <div className="header">
      <h3 onClick={() => navigate("/")}>TDU裏サイト</h3>
      <button className="lginbt" onClick={handleButtonClick}>
        {logininfo ? "ログアウト" : "ログイン"} {/* 状態に応じた表示 */}
      </button>
    </div>
  );
};

export default Header;
