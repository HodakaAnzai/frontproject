import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Lecture.css';

const Lecture = ({ lecture }) => {
  const navigate = useNavigate();

  // データがなかった時の値
  const lectureTitle = lecture?.title || "講義名";
  const dayDetail = lecture?.day || "月曜 2限";
  const teacherDetail = lecture?.teacher || "担当教名";
  const badGoodCount = lecture?.badGoodCount || 2;

  return (
    <div className="lecture" onClick={() => navigate("/LectureDetail")}>
      <h3 className='lectureTitle'>
        {lectureTitle}
      </h3>
      <div className='lectureDetail'>
        <h2 className='dayDetail'>{dayDetail}</h2>
        <h2 className='teacherDetail'>{teacherDetail}</h2>
        <div className='badfavorite'>
          <FavoriteIcon />
          <p className='badgoodcount'>{badGoodCount}</p>
        </div>
      </div>
    </div>
  );
};

Lecture.propTypes = {
  lecture: PropTypes.shape({
    title: PropTypes.string,
    day: PropTypes.string,
    teacher: PropTypes.string,
    badGoodCount: PropTypes.number,
  }),
};

Lecture.defaultProps = {
  lecture: {
    title: "講義名",
    day: "月曜 2限",
    teacher: "担当教名",
    badGoodCount: 2,
  },
};

export default Lecture;