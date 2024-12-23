import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";
import { useCallback, useRef, useState } from "react";
import "./InputComment.css";
import "./InputReply.css";

const InputReply = ({ userId, lectureId, parentComment, onCommentAdded }) => {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");

  const handleInput = useCallback(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("コメントを入力してください");
      return;
    }

    const payload = {
      userId: userId,
      classId: lectureId,
      content: content.trim(),
      parentComment: parentComment, // リプライの親コメントID
    };

    console.log("送信データ:", payload);

    try {
      const response = await fetch("http://localhost:8080/wsp-example/AddComment2", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        alert("リプライが追加されました");
        setContent(""); // 入力欄をリセット
        onCommentAdded(); // コメントリストを更新
      } else {
        alert(data.message || "リプライの追加に失敗しました");
      }
    } catch (err) {
      console.error("リプライ送信エラー:", err);
      alert("サーバーへの接続に失敗しました");
    }
  };

  return (
    <div>
      <div className="inputCommentArea reply">
        <div className="Icon_comment">
          <AccountCircleIcon />
          <textarea
            ref={textareaRef}
            className="textArea"
            placeholder="リプライコメントを入力...."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              handleInput();
            }}
          ></textarea>
        </div>

        <div className="inputButtonArea">
          <button className="sendComment" onClick={handleSubmit}>
            送信
          </button>
        </div>
      </div>
    </div>
  );
};

InputReply.propTypes = {
  userId: PropTypes.string.isRequired,
  lectureId: PropTypes.number.isRequired,
  parentComment: PropTypes.number.isRequired, // リプライ対象のコメントID
  onCommentAdded: PropTypes.func.isRequired, // コメントリストを更新する関数
};

export default InputReply;
