import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import "./LectureDetail.css";
import Chat from "./chat/Chat";
import InputComment from "./comment/InputComment";

export const LectureDetail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="buttonArea">
        <button className="returnButton" onClick={() => navigate("/")}>
          ≺
        </button>
        <button className="editButton" onClick={()=>navigate("/AddLecture/LectureEdit")}>編集</button>
      </div>

      <div className="lectureArea">
        <div className="lectureTitleArea">
          <h2 className="lectureTitle">講義名</h2>
        </div>

        <div className="lectureSeasonArea">
          <CalendarMonthIcon />
          <h3>開講時期:</h3>
          <h3>前期</h3>
        </div>

        <div className="DayOfTimeArea">
          <AccessTimeIcon />
          <h3>曜日・時限:</h3>
          <h3>月曜・３限</h3>
        </div>

        <div className="teacherArea">
          <PersonIcon />
          <h3>担当教授名:</h3>
          <h3>ドンキーコング</h3>
        </div>

        <div className="commentArea">
          <ModeCommentIcon />
          <h3>コメント:</h3>
        </div>
        <div className="commentTextArea">
          <p>コメントテキスト</p>
        </div>

        <div className="badgoodArea">
          <FavoriteIcon />
          <p>30</p>
        </div>

        <div className="deleteButtonArea">
          <button className="deleteButton" onClick={()=>navigate("/LectureDetail/ConfirmDelete")}>削除</button>
        </div>
      </div>

      <InputComment />

      <div className="chatArea">
        <Chat />
        <Chat />
      </div>


    </div>
  );
};

export default LectureDetail;
