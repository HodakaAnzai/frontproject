import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lecture from "./lecture/Lecture";
import "./LectureList.css";

const LectureList = () => {
  const [inputText, setInputText] = useState("");
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch("/api/lectures"); 
        if (response.ok) {
          const data = await response.json();
          setLectures(data);
          console.log("ok");
        } else {
          throw new Error("Failed to fetch lectures");
        }
      } catch (error) {
        console.error("Error fetching lectures:", error);
        setLectures([]); 
      }
    };

    fetchLectures();
  }, []);

  const onchangeText = (e) => {
    setInputText(e.target.value);
  };
  console.log(inputText);

  const addlectureNavi = useNavigate();
  const navigate=useNavigate();

  return (
    <>
      <div className="lectureAddArea">
        <button className="bunListButton" onClick={()=>navigate("/Banlist")}>Banリスト</button>
        <button className="addButton" value={inputText} onClick={() => addlectureNavi("/AddLecture")}>授業追加＋</button>
      </div>

      <div className="searchArea">
        <div className="searchForm">
          <input type="text" placeholder="キーワードを入力...." onChange={(e) => onchangeText(e)}></input>
          <button className="searchButton">検索</button>
        </div>
      </div>

      <div className="titleArea">
        <h2>授業情報一覧</h2>
        <select name="filter">
          <option value="jan">悪いね数順</option>
          <option value="feb">前期</option>
          <option value="mar">後期</option>
        </select>
      </div>

      <div className="lecturelistArea">
        {lectures.length > 0 ? (
          lectures.map((lecture, index) => (
            <Lecture key={index} lecture={lecture} />
          ))
        ) : (
          
          <>
            <Lecture />
            <Lecture />
            <Lecture />
            <Lecture />
          </>
        )}
      </div>
    </>
  );
};

export default LectureList;