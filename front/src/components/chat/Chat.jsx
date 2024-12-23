import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommentIcon from "@mui/icons-material/Comment";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputReply from "../comment/InputReply";
import Reply from "../reply/Reply";
import "./Chat.css";

const Chat = ({ comment, replies, userId, lectureId, onCommentAdded }) => {
  const [reply, setReply] = useState(false);
  const navigate = useNavigate();

  const handleSetReply = () => {
    setReply(!reply);
  };

  return (
    <>
      <div className="chat">
        <div className="userDetail">
          <div className="Icon" onClick={() => navigate("/UserDetail",
            {state:{
              userId:comment.userId,
              commentId:comment.commentId,
            }}
          )}>
            <AccountCircleIcon />
          </div>
          <h3 className="userId">{comment.userId}</h3>
        </div>
        <div className="comment_Icon">
          <p>{comment.content}</p>
          <div className="Icon2">
            <CommentIcon onClick={handleSetReply} />
          </div>
        </div>
      </div>
      {reply && (
        <>
          <div className="replyArea">
            {replies.map((reply) => (
              <Reply key={reply.commentId} reply={reply} />
            ))}
          </div>
          <InputReply
            userId={userId}
            lectureId={lectureId}
            parentComment={comment.commentId}
            onCommentAdded={onCommentAdded}
          />
        </>
      )}
    </>
  );
};

Chat.propTypes = {
  comment: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    commentId: PropTypes.number.isRequired,
    parentComment: PropTypes.number,
  }).isRequired,
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      commentId: PropTypes.number.isRequired,
      parentComment: PropTypes.number,
    })
  ).isRequired,
  userId: PropTypes.string.isRequired,
  lectureId: PropTypes.number.isRequired,
  onCommentAdded: PropTypes.func.isRequired,
};

export default Chat;
