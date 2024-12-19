import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComment from "../comment/InputComment";
import Reply from "../reply/Reply";
import "./Chat.css";

const Chat = () => {
  const [reply, setReply] = useState(false);
  const navigate = useNavigate();
  const handlesetReply = () => {
    setReply(!reply);
    console.log(reply);
  };

  return (
    <>
      <div className="chat">
        <div className="userDetail">
          <div className="Icon" onClick={() => navigate("/UserDetail")}>
            <AccountCircleIcon />
          </div>
          <h3 className="userId">22fi999</h3>
        </div>
        <div className="comment_Icon">
          <p>コメント</p>
          <CommentIcon onClick={handlesetReply} />
        </div>
      </div>
      {reply && (
        <>
          <div className="replyArea">
            <Reply />
          </div>
          <InputComment />
        </>
      )}
    </>
  );
};

export default Chat;
