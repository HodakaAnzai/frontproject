import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginProvider";
import "./AddLecture.css";

const AddLecture = () => {
  const navigate = useNavigate();
  const textaraRef = useRef(null);
  const { logininfo } = useContext(LoginContext);

  const [lecturename, setLectureName] = useState(""); //講義名
  const [season, setSeason] = useState(null); //開講時期
  const [teacherName, setTeacherName] = useState(""); //教授名
  const [reviewtext, setReviewText] = useState(""); //レヴュー
  const [day, setDay] = useState(""); // 曜日の状態管理
  const [period, setPeriod] = useState(""); // 何限の状態管理

  const [allinput, setAllinput] = useState(false); //未入力箇所があるか判定

  const onChangeName = (e) => {
    setLectureName(e.target.value);
  };

  const onChangeTeacherName = (e) => {
    setTeacherName(e.target.value);
  };

  const onChangeReviewText = (e) => {
    setReviewText(e.target.value);
    const textarea = textaraRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const onChangeDay = (e) => {
    setDay(e.target.value);
  };

  const onChangePeriod = (e) => {
    setPeriod(e.target.value);
  };

  useEffect(()=>{
    if(!logininfo){
     navigate("/loginpass");
    }
   },[])

  useEffect(() => {
    if (
      !lecturename ||
      !season ||
      !teacherName ||
      !reviewtext ||
      !day ||
      !period
    ) {
      setAllinput(false);
    } else {
      setAllinput(true);
    }
  }, [lecturename, season, teacherName, reviewtext, day, period]);

  const onClickSubmit = () => {
    console.log(1111);
    if (allinput) {
      navigate("/AddLecture/Comfirm", {
        state: {
          lecturename,
          season,
          teacherName,
          reviewtext,
          day,
          period,
        },
      });
    }
  };

  console.log(lecturename);
  console.log(season);
  console.log(teacherName);
  console.log(reviewtext);
  console.log(day);
  console.log(period);
  console.log(allinput);

  return (
    <div>
      <div className="buttonArea">
        <button className="returnButton" onClick={() => navigate("/")}>
          ≺
        </button>
      </div>

      <div className="addLectureArea">
        <div className="addLectureTitle">
          <h2 className="addLectureH2">授業登録</h2>
        </div>

        <div className="addLectureContent">
          {/* 授業名 */}
          <div className="contentArea">
            <h3 className="lectureName">
              <span className="must-state">必須</span>授業名
            </h3>
            <input
              type="text"
              placeholder="授業名を入力してください"
              className="inputLectureName"
              onChange={(e) => onChangeName(e)}
            />
          </div>

          {/* 学期 */}
          <div className="contentArea">
            <h3 className="lectureSeason">
              <span className="must-state">必須</span>学期
            </h3>
            <div className="radioGroup">
              <input
                type="radio"
                id="spring"
                name="season"
                className="radioButton"
                onClick={() => setSeason("前期")}
              />
              <label htmlFor="spring">前期</label>
              <input
                type="radio"
                id="autumn"
                name="season"
                className="radioButton"
                onClick={() => setSeason("後期")}
              />
              <label htmlFor="autumn">後期</label>
            </div>
          </div>

          {/* 曜日と何限 */}
          <div className="contentArea">
            <h3 className="lectureDayTime">
              <span className="must-state">必須</span>曜日・時間
            </h3>
            <div className="dayTimeRow">
              <select
                className="inputLectureDay"
                value={day}
                onChange={(e) => onChangeDay(e)}
              >
                <option value="" disabled>
                  曜日を選択
                </option>
                <option value="月">月曜</option>
                <option value="火">火曜</option>
                <option value="水">水曜</option>
                <option value="木">木曜</option>
                <option value="金">金曜</option>
              </select>
              <input
                type="text"
                placeholder="例: 3"
                className="inputLectureTime"
                value={period}
                onChange={(e) => onChangePeriod(e)}
              />
            </div>
          </div>

          {/* 教授名 */}
          <div className="contentArea">
            <h3 className="lectureProfessor">
              <span className="must-state">必須</span>担当教授名
            </h3>
            <input
              type="text"
              placeholder="教授名を入力してください"
              className="inputLectureProfessor"
              onChange={(e) => onChangeTeacherName(e)}
            />
          </div>

          {/* 自由コメント */}
          <div className="contentArea">
            <h3 className="lectureComments">
              <span className="must-state">必須</span>自由コメント
            </h3>
            <textarea
              ref={textaraRef}
              placeholder="授業についてのコメントを入力してください"
              className="textareaLectureComments"
              onChange={(e) => onChangeReviewText(e)}
            ></textarea>
          </div>

          {allinput || <h2 className="no-entered">未入力の欄があります</h2>}

          <div className="submitButton">
            <button onClick={onClickSubmit}>確定</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLecture;
