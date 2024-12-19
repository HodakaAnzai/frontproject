import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useCallback, useRef } from "react";
import "./InputComment.css";

const InputComment = () => {
  const textareaRef = useRef(null);

  // テキストエリアの高さを動的に調整する関数
  const handleInput = useCallback(() => {
    const textarea = textareaRef.current;

    // テキストエリアの高さを調整
    textarea.style.height = "auto"; // 高さリセット
    textarea.style.height = `${textarea.scrollHeight}px`; 
  },[textareaRef]);

  return (
    <div>
      <div className="inputCommentArea">
        <div className="Icon_comment">
          <AccountCircleIcon />
          <textarea
            ref={textareaRef}
            className="textArea"
            placeholder="コメントを入力...."
            onChange={handleInput}
          ></textarea>
        </div>

        <div className="inputButtonArea">
          <button className="sendComment">送信</button>
        </div>
      </div>
    </div>
  );
};

export default InputComment;
