import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BanlistContext } from "../BanlistProvider";
import "./BanList.css";

const Banlist = () => {
  const { banlist, error } = useContext(BanlistContext); // Context からデータを取得
  const navigate = useNavigate();

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
    <div className="ban" onClick={() => navigate("/UserDetail", {
      state: {
        userId: id.userId,
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
