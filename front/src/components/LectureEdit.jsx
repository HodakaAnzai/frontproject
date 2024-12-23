import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddLecture.css";

const LectureEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, title, semester, year, day2, period2, teacher, description } =
    location.state || {};

  const textaraRef = useRef(null);

  const [lecturename, setLectureName] = useState(title); // 講義名
  const [season, setSeason] = useState(semester); // 開講時期
  const [selectedYear, setSelectedYear] = useState(year); // 開講年度
  const [teacherName, setTeacherName] = useState(teacher); // 教授名
  const [reviewtext, setReviewText] = useState(description); // レビュー
  const [day, setDay] = useState(day2); // 曜日の状態管理
  const [period, setPeriod] = useState(period2); // 何限の状態管理
  const [allinput, setAllinput] = useState(false); // 未入力箇所があるか判定

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

  const onChangeYear = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    if (
      !lecturename ||
      !season ||
      !selectedYear ||
      !teacherName ||
      !reviewtext ||
      !day ||
      !period
    ) {
      setAllinput(false);
    } else {
      setAllinput(true);
    }
  }, [lecturename, season, selectedYear, teacherName, reviewtext, day, period]);

  const onClickSubmit = async () => {
    if (!allinput) {
      alert("全てのフィールドを入力してください。");
      return;
    }

    const updatedLectureData = {
      classId: id,
      className: lecturename,
      year: parseInt(selectedYear),
      term: season,
      day: day,
      period: parseInt(period),
      professor: teacherName,
      description: reviewtext,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/wsp-example/Editapi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(updatedLectureData),
        }
      );

      if (response.ok) {
        alert("授業情報が更新されました。");
        navigate("/");
      } else {
        const errorText = await response.text();
        console.error("Error updating lecture:", errorText);
        alert("授業情報の更新に失敗しました。");
      }
    } catch (err) {
      console.error("Error sending update request:", err);
      alert("サーバーへの接続に失敗しました。");
    }
  };

  return (
    <div>
      <div className="buttonArea">
        <button className="returnButton" onClick={() => navigate("/")}>
          ≺
        </button>
      </div>

      <div className="addLectureArea">
        <div className="addLectureTitle">
          <h2 className="addLectureH2">授業編集</h2>
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
              value={lecturename}
              onChange={onChangeName}
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
                value="前期"
                checked={season === "前期"}
                onChange={(e) => setSeason(e.target.value)}
              />
              <label htmlFor="spring">前期</label>
              <input
                type="radio"
                id="autumn"
                name="season"
                className="radioButton"
                value="後期"
                checked={season === "後期"}
                onChange={(e) => setSeason(e.target.value)}
              />
              <label htmlFor="autumn">後期</label>
            </div>
          </div>

          {/* 開講年度 */}
          <div className="contentArea">
            <h3 className="lectureYear">
              <span className="must-state">必須</span>開講年度
            </h3>
            <input
              type="number"
              placeholder="例: 2024"
              className="inputLectureYear"
              value={selectedYear}
              onChange={onChangeYear}
            />
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
                onChange={onChangeDay}
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
                placeholder="例: 3限"
                className="inputLectureTime"
                value={period}
                onChange={onChangePeriod}
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
              value={teacherName}
              onChange={onChangeTeacherName}
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
              value={reviewtext}
              onChange={onChangeReviewText}
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

export default LectureEdit;
