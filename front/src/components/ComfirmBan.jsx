import { useLocation, useNavigate } from "react-router-dom";
import "./ComfirmDelete.css";

const ComfirmBan = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { userId = "", comment = {} } = state || {};
    const { commentId = null } = comment;

    // デバッグ: state の内容を確認
    console.log("state:", state);
    console.log("userId:", userId);
    console.log("commentId:", commentId);

    const handleConfirmBan = async () => {
        try {
            const response = await fetch("http://localhost:8080/wsp-example/AddToBanListapi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    userId: userId,
                    commentId: commentId,
                }),
            });

            if (response.ok) {
                navigate("/Banlist");
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
