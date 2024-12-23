import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import PersonIcon from "@mui/icons-material/Person";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginProvider";
import { UserIdContext } from "../UserIdProvider";
import "./LectureDetail.css";
import Chat from "./chat/Chat";
import InputComment from "./comment/InputComment";

const LectureDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, title, semester, day, period, teacher, description, badGoodCount } =
    location.state || {};

  const [comments, setComments] = useState([]);
  const { userId } = useContext(UserIdContext);
  const { logininfo } = useContext(LoginContext);

  const UserId= userId; // ユーザーID

  useEffect(()=>{
   if(!logininfo){
    navigate("/loginpass");
   }
  },[])

  // コメントを取得する関数
  const fetchComments = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/wsp-example/api/comments",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("コメントデータの取得に失敗しました");
      }

      const data = await response.json();
      // 授業 ID に一致するコメントをフィルタリング
      const filteredComments = data.filter((comment) => comment.classId === id);
      setComments(filteredComments);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // 初回読み込み時にコメントを取得
  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <div>
      <div className="buttonArea">
        <button className="returnButton" onClick={() => navigate("/")}>
          ≺
        </button>
        <button
          className="editButton"
          onClick={() =>
            navigate("/AddLecture/LectureEdit", {
              state: { id, title, semester, day2: day, period2: period, teacher, description },
            })
          }
        >
          編集
        </button>
      </div>

      <div className="lectureArea">
        <div className="lectureTitleArea">
          <h2 className="lectureTitle">{title}</h2>
        </div>
        <div className="lectureSeasonArea">
          <CalendarMonthIcon />
          <h3>開講時期:</h3>
          <h3>{semester}</h3>
        </div>
        <div className="DayOfTimeArea">
          <AccessTimeIcon />
          <h3>曜日・時限:</h3>
          <h3>
            {day}曜・{period}限
          </h3>
        </div>
        <div className="teacherArea">
          <PersonIcon />
          <h3>担当教授名:</h3>
          <h3>{teacher}</h3>
        </div>
        <div className="commentArea">
          <ModeCommentIcon />
          <h3>コメント:</h3>
        </div>
        <div className="commentTextArea">
          <p>{description}</p>
        </div>
        <div className="badgoodArea">
          <FavoriteIcon />
          <p>{badGoodCount}</p>
        </div>
        <div className="deleteButtonArea">
          <button
            className="deleteButton"
            onClick={() =>
              navigate("/LectureDetail/ConfirmDelete", { state: { id } })
            }
          >
            削除
          </button>
        </div>
      </div>

      {/* コメント入力エリア */}
      <InputComment userId={userId} lectureId={id} onCommentAdded={fetchComments} />

      {/* コメント表示エリア */}
      <div className="chatArea">
        {comments.length > 0 ? (
          comments
            .filter((comment) => !comment.parentComment) // メインコメントを表示
            .map((comment) => (
              <Chat
                key={comment.commentId}
                comment={comment}
                replies={comments.filter(
                  (reply) => reply.parentComment === comment.commentId
                )}
                userId={UserId}
                lectureId={id}
                onCommentAdded={fetchComments}
              />
            ))
        ) : (
          <p className="nocomment-text">コメントがありません。</p>
        )}
      </div>
    </div>
  );
};

export default LectureDetail;
