import { useLocation, useNavigate } from "react-router-dom";
import "./ComfirmDelete.css";

const ComfirmDelete = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state; // 渡された授業ID
 console.log(id);
  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:8080/wsp-example/Deleteapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classId: id }), // 授業IDを送信
      });

      const data = await response.json();
      if (response.ok && data.status === "success") {
        alert("授業が削除されました");
        navigate("/CompleteDelete"); 
      } else {
        alert(data.message || "授業の削除に失敗しました");
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      alert("サーバーへの接続に失敗しました");
    }
  };

  return (
    <div>
      <div className="compfirmDeleteArea">
        <h2>削除しますか？</h2>
        <div className="selectbuttonArea">
          <button className="cancel" onClick={() => navigate("/")}>
            キャンセル
          </button>
          <button className="ok" onClick={handleDelete}>
            確定
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComfirmDelete;
