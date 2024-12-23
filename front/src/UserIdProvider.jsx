import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const UserIdContext = createContext();

const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    // 初期値をlocalStorageから取得
    const savedUserId = localStorage.getItem("userId");
    return savedUserId || "";
  });

  useEffect(() => {
    // ユーザーIDをlocalStorageに保存
    localStorage.setItem("userId", userId);
  }, [userId]);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

UserIdProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserIdProvider;
