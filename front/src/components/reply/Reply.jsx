import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types"; // PropTypesをインポート
import "./Reply.css";

const Reply = ({ reply }) => {
  return (
    <div className="reply">
      <div className="userDetail">
        <AccountCircleIcon />
        <h3 className="userId">{reply.userId}</h3>
      </div>
      <p>{reply.content}</p>
    </div>
  );
};

// PropTypesでpropsの型を定義
Reply.propTypes = {
  reply: PropTypes.shape({
    userId: PropTypes.string.isRequired, // userIdは必須
    content: PropTypes.string.isRequired, // contentは必須
    commentId: PropTypes.number.isRequired, // commentIdは必須
    parentComment: PropTypes.number, // parentCommentはオプション
  }).isRequired,
};

export default Reply;
