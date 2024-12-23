import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginProvider";
import "./ComfirmDelete.css";

const Logout = () => {
  const navigate = useNavigate();
  const { setLogininfo } = useContext(LoginContext);

  const handleLogout = () => {
    setLogininfo(false);
    alert("ログアウトしました")
    navigate("/");
  };

  return (
   <div>
      <div className="compfirmDeleteArea">
        <h2>ログアウトしますか？</h2>
        <div className="selectbuttonArea">
          <button className="cancel" onClick={() => navigate("/")}>
            キャンセル
          </button>
          <button className="ok" onClick={handleLogout}>
            確定
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
