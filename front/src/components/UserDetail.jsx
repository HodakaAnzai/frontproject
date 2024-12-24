import PropTypes from "prop-types";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BanlistContext } from "../BanlistProvider"; // BanlistContext をインポート
import './UserDetail.css';

const UserDetail = () => {
  const location = useLocation();
  const { userId, commentId } = location.state || {}; // userId と commentId を受け取る

  return (
    <div className="user-detail-area">
      <h1 className="title">ユーザー詳細</h1>
      <UserDetailComponent userId={userId} commentId={commentId} />
    </div>
  );
};

const UserDetailComponent = ({ userId, commentId }) => {
  const { banlist } = useContext(BanlistContext); // BanlistContext から banlist を取得
  const isBan = banlist.some((banEntry) => banEntry.userId === userId); // ユーザーがBANされているか確認
  const navigate = useNavigate();

  const handleBanToggle = () => {
    if (!isBan) {
      // BAN中なら /ConfirmBan に遷移
      navigate("/ComfirmBan", { state: { userId, commentId } });
    } else {
      // BAN解除処理は実装しない (仕様により)
      alert("このユーザーはBANされています。");
    }
  };

  return (
    <div className="detail">
      <h2>{userId}</h2>
      <p>{userId}@ms.dendai.ac.jp</p>
      <button onClick={handleBanToggle}>
        {isBan ? "BAN中" : "BANする"}
      </button>
    </div>
  );
};

UserDetailComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  commentId: PropTypes.number,
};

export default UserDetail;
