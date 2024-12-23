import { useLocation, useNavigate } from "react-router-dom";
import "./ComfirmDelete.css";

const ComfirmBan = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { userId = "" } = state || {};

    const handleConfirmBan = async () => {
        try {
            const response = await fetch("http://localhost:8080/wsp-example/AddToBanListApi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    userId: userId, // サーバーに userId を送信
                }),
            });

            if (response.ok) {
                navigate("/Banlist"); // バンリスト画面へ遷移
            } else {
                console.error("バンリストへの追加に失敗しました");
                alert("エラーが発生しました。再試行してください。");
            }
        } catch (error) {
            console.error("通信エラー:", error);
            alert("通信エラーが発生しました。再試行してください。");
        }
    };

    return (
        <div className="compfirmDeleteArea">
            <h2>Banしますか？</h2>
            <div className="selectbuttonArea">
                <button className="cancel" onClick={() => navigate("/Banlist")}>
                    キャンセル
                </button>
                <button className="ok" onClick={handleConfirmBan}>
                    確定
                </button>
            </div>
        </div>
    );
};

export default ComfirmBan;
