import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { BanlistProvider } from "./BanlistProvider";
import AddLecture from "./components/AddLecture";
import Banlist from "./components/Banlist";
import ComfirmBan from "./components/ComfirmBan";
import ComfirmDelete from "./components/ComfirmDelete";
import CompleteAdd from "./components/CompleteAdd";
import CompleteDelete from "./components/CompleteDelete";
import Confirm from "./components/Confirm";
import Header from "./components/Header";
import LectureDetail from "./components/LectureDetail";
import LectureEdit from "./components/LectureEdit";
import LectureList from "./components/LectureList";
import Logout from "./components/Logout";
import NewPassward from "./components/NewPassward";
import Passward from "./components/Passward";
import UserDetail from "./components/UserDetail";
import LoginProvider from "./LoginProvider";
import UserIdProvider from "./UserIdProvider";

function App() {
  return (
    <>
      <BrowserRouter>
      <LoginProvider>
        {/* <Header /> */}
        <div className="header">
          <Header />
        </div>
         <UserIdProvider>
          <BanlistProvider >
        {/* <main> */}
        <Routes>
          <Route path="/" element={<LectureList />} />
          <Route path="/loginpass" element={<Passward />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/NewPassward" element={<NewPassward />} />
          <Route path="/LectureDetail" element={<LectureDetail />} />
          <Route path="/AddLecture" element={<AddLecture />} />
          <Route path="/AddLecture/Comfirm" element={<Confirm />} />
          <Route path="/LectureDetail/ConfirmDelete" element={<ComfirmDelete />} />
          <Route path="/CompleteAdd" element={<CompleteAdd />} />
          <Route path="/CompleteDelete" element={<CompleteDelete />} />
          <Route path="/AddLecture/LectureEdit" element={<LectureEdit />} />
          <Route path="/Banlist" element={<Banlist />} />
          <Route path="/ComfirmBan" element={<ComfirmBan />} />
          <Route path="/UserDetail" element={<UserDetail />} />
        </Routes>
        </BanlistProvider>
        </UserIdProvider>
        </LoginProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
