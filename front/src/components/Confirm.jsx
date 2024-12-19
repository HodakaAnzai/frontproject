import { useLocation, useNavigate } from "react-router-dom";
import "./Confirm.css";

const Confirm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  //   if(!state){
  //     return <h2>データがありません</h2>
  //   }

     const{ lecturename, season, teacherName, reviewtext, day, period }=state;

  return (
    <div>
      <div className="buttonArea">
        <button
          className="returnButton"
          onClick={() => navigate("/AddLecture")}
        >
          ≺
        </button>
      </div>

      <div className="comfirmArea">
        <div className="comfirmArea-state">
            <h2>登録内容を確認してください</h2>
        </div>

        <div className="comfirmcontent">
            <div className="comfirm-item">
                <p><label>授業名:</label>{lecturename}</p>
            </div>
            <div className="comfirm-item">
                <p><label>開講時期：</label>{season}</p>
            </div>
            <div className="comfirm-item">
                <p><label>担当教授名：</label>{teacherName}</p>
            </div>
            <div className="comfirm-item">
                <p><label>曜日・時間：</label>{day}・{period}</p>
            </div>
            <div className="comfirm-textitem">
                <label>自由コメント：</label>
                <p>{reviewtext}</p>
            </div>

            <div className="submitButton">
            <button onClick={()=>navigate("/CompleteAdd")}>確定</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
