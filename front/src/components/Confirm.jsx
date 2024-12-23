import { useLocation, useNavigate } from "react-router-dom";
import "./Confirm.css";

const Confirm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const { lecturename, season, teacherName, reviewtext, day, period } = state;

  const handleConfirm = async () => {
    const payload = {
      className: lecturename,
      year: new Date().getFullYear(), // 現在の年を設定
      semester: season,
      day: day,
      period: parseInt(period), // 時限を整数に変換
      instructor: teacherName,
      description: reviewtext,
    };

    try {
      const response = await fetch("http://localhost:8080/wsp-example/addClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("授業が正常に登録されました");
        navigate("/"); // 正常時にホーム画面へリダイレクト
      } else {
        const errorData = await response.json();
        alert(`エラーが発生しました: ${errorData.message || "不明なエラー"}`);
      }
    } catch (error) {
      console.error("授業登録エラー", error);
      alert("サーバーとの通信中にエラーが発生しました");
    }
  };

  return (
    <div>
      <div className="buttonArea">
        <button className="returnButton" onClick={() => navigate("/AddLecture")}>
          ≺
        </button>
      </div>

      <div className="comfirmArea">
        <div className="comfirmArea-state">
          <h2>登録内容を確認してください</h2>
        </div>

        <div className="comfirmcontent">
          <div className="comfirm-item">
            <p>
              <label>授業名:</label>
              {lecturename}
            </p>
          </div>
          <div className="comfirm-item">
            <p>
              <label>開講時期：</label>
              {season}
            </p>
          </div>
          <div className="comfirm-item">
            <p>
              <label>担当教授名：</label>
              {teacherName}
            </p>
          </div>
          <div className="comfirm-item">
            <p>
              <label>曜日・時間：</label>
              {day}・{period}
            </p>
          </div>
          <div className="comfirm-textitem">
            <label>自由コメント：</label>
            <p>{reviewtext}</p>
          </div>

          <div className="submitButton">
            <button onClick={handleConfirm}>確定</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
