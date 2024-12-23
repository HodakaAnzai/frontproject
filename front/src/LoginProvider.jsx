import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [logininfo, setLogininfo] = useState(() => {
    // 初期値をlocalStorageから取得
    const savedLoginInfo = localStorage.getItem("logininfo");
    return savedLoginInfo ? JSON.parse(savedLoginInfo) : false;
  });

  useEffect(() => {
    // ログイン状態をlocalStorageに保存
    localStorage.setItem("logininfo", JSON.stringify(logininfo));
  }, [logininfo]);

  return (
    <LoginContext.Provider value={{ logininfo, setLogininfo }}>
      {children}
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
