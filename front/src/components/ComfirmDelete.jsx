import { useNavigate } from "react-router-dom";
import "./ComfirmDelete.css";

const ComfirmDelete = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="compfirmDeleteArea">
        <h2>削除しますか？</h2>
        <div className="selectbuttonArea">
          <button className="cancel" onClick={() => navigate("/LectureDetail")}>
            キャンセル
          </button>
          <button className="ok" onClick={() => navigate("/CompleteDelete")}>
            確定
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComfirmDelete;
