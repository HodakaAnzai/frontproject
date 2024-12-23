import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginProvider";
import { UserIdContext } from "../UserIdProvider";
import Lecture from "./lecture/Lecture";
import "./LectureList.css";

const LectureList = () => {
  const [useban, setUseban] = useState(false);
  const [inputText, setInputText] = useState("");
  const [lectures, setLectures] = useState([]);
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [filterOption, setFilterOption] = useState("default"); // フィルター条件
  const navigate = useNavigate();
  const { userId } = useContext(UserIdContext);
  const { logininfo } = useContext(LoginContext);

  // 授業データを取得
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/wsp-example/api/classesapi"
        );
        if (response.ok) {
          const data = await response.json();
          setLectures(data);
          setFilteredLectures(data); // 初期表示用
          console.log("Lectures fetched successfully");
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

  // Banリストボタン表示条件
  useEffect(() => {
    if (
      (userId.includes("22fi002") ||
        userId.includes("22fi008") ||
        userId.includes("22fi009") ||
        userId.includes("22fi010")) &&
      logininfo
    ) {
      setUseban(true);
    } else {
      setUseban(false);
    }
  }, []);

  // 検索処理
  const handleSearch = () => {
    let updatedLectures = [...lectures];

    // 入力に基づくフィルタリング
    if (inputText.trim()) {
      updatedLectures = updatedLectures.filter((lecture) =>
        lecture.title.toLowerCase().includes(inputText.toLowerCase())
      );
    }

    // フィルター条件に基づくフィルタリング
    switch (filterOption) {
      case "badGoodCount":
        updatedLectures.sort((a, b) => b.badGoodCount - a.badGoodCount); // 悪いね数順
        break;
      case "firstSemester":
        updatedLectures = updatedLectures.filter(
          (lecture) => lecture.semester === "前期"
        );
        break;
      case "secondSemester":
        updatedLectures = updatedLectures.filter(
          (lecture) => lecture.semester === "後期"
        );
        break;
      default:
        break; // 通常表示
    }

    setFilteredLectures(updatedLectures);
  };

  // フィルターの変更
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    handleSearch(); // フィルタリングを更新
  };

  const onchangeText = (e) => {
    setInputText(e.target.value);
  };

  return (
    <>
      <div className="lectureAddArea">
        {/* Banリストボタンのスペースを確保 */}
        <div className="bunListButtonContainer">
          {useban ? (
            <button
              className="bunListButton"
              onClick={() => navigate("/Banlist")}
            >
              Banリスト
            </button>
          ) : (
            <div className="bunListButtonPlaceholder" />
          )}
        </div>

        <button className="addButton" onClick={() => navigate("/AddLecture")}>
          授業追加＋
        </button>
      </div>

      <div className="searchArea">
        <div className="searchForm">
          <input
            type="text"
            placeholder="キーワードを入力...."
            value={inputText}
            onChange={(e) => onchangeText(e)}
          />
          <button className="searchButton" onClick={handleSearch}>
            検索
          </button>
        </div>
      </div>

      <div className="titleArea">
        <h2>授業情報一覧</h2>
        <select name="filter" value={filterOption} onChange={handleFilterChange}>
          <option value="default">通常表示</option>
          <option value="badGoodCount">悪いね数順</option>
          <option value="firstSemester">前期</option>
          <option value="secondSemester">後期</option>
        </select>
      </div>

      <div className="lecturelistArea">
        {filteredLectures.length > 0 ? (
          filteredLectures.map((lecture, index) => (
            <Lecture key={index} lecture={lecture} />
          ))
        ) : (
          <p className="nolecture">該当する講義が見つかりません。</p>
        )}
      </div>
    </>
  );
};

export default LectureList;
