import { useNavigate } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const navigate = useNavigate();
  const rogin=()=>{
    navigate("/loginpass");
  }
  return (
    <div className="header">
      <h3 onClick={()=>navigate("/")}>TDU裏サイト</h3>
      <button className="lginbt" onClick={rogin}>ログイン</button>
    </div>
  );
};

export default Header;
