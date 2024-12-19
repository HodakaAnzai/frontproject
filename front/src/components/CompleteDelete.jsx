import { useNavigate } from "react-router-dom";
import './CompleteDelete.css';

const CompleteDelete = () => {
const navigate=useNavigate();
  return (
    <div className="completeDeleteArea">
      <h2>授業を削除しました</h2>
      <button onClick={()=>navigate("/")}>確定</button>
    </div>
  )
}

export default CompleteDelete
