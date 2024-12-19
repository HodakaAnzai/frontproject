import { useNavigate } from "react-router-dom";
import "./CompleteAdd.css";

const CompleteAdd = () => {
    const navigate=useNavigate();
  return (
    <div>
      <div className="completeaddArea">
        <h2>登録ありがとうございます<br ></br>授業の投稿が完了しました</h2>
        <button onClick={()=>navigate("/")}>確定</button>
      </div>
    </div>
  );
};

export default CompleteAdd;
