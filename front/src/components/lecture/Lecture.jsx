import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Lecture.css";

const Lecture = ({ lecture }) => {
  const navigate = useNavigate();

  // データがなかった時のデフォルト値
  const lectureId = lecture?.id || 0;
  const lectureTitle = lecture?.title || "講義名";
  const semester = lecture?.semester || "前期";
  const dayDetail = lecture?.day || "月曜";
  const periodDetail = lecture?.period || "2限";
  const teacherDetail = lecture?.teacher || "担当教名";
  const description = lecture?.description || "授業の詳細がありません";
  const badGoodCount = lecture?.badGoodCount || 0; // 初期値を受け取る

  return (
    <div
      className="lecture"
      onClick={() =>
        navigate("/LectureDetail", {
          state: {
            id: lectureId,
            title: lectureTitle,
            semester: semester,
            day: dayDetail,
            period: periodDetail,
            teacher: teacherDetail,
            description: description,
            badGoodCount: badGoodCount, // 受け取った badGoodCount を渡す
          },
        })
      }
    >
      <h3 className="lectureTitle">{lectureTitle}</h3>
      <div className="lectureDetail">
        <p className="dayDetail">
          {dayDetail}曜 {periodDetail}限
        </p>
        <p className="teacherDetail">{teacherDetail}</p>
        <div className="badfavorite">
          <FavoriteIcon className="favoriteIcon" />
          <p className="badgoodcount">{badGoodCount}</p> {/* badGoodCount を表示 */}
        </div>
      </div>
    </div>
  );
};

Lecture.propTypes = {
  lecture: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    semester: PropTypes.string,
    day: PropTypes.string,
    period: PropTypes.string,
    teacher: PropTypes.string,
    description: PropTypes.string,
    badGoodCount: PropTypes.number, // badGoodCount を追加
  }),
};

Lecture.defaultProps = {
  lecture: {
    id: 1,
    title: "講義名",
    semester: "前期",
    day: "月曜",
    period: "2限",
    teacher: "担当教名",
    description: "授業の詳細がありません",
    badGoodCount: 0, // デフォルト値を 0 に設定
  },
};

export default Lecture;
