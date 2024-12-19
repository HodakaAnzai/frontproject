import { Children, createContext, useState } from "react";

const LoginContext=createContext();

const LoginProvider = () => {
  const[logininfo,setLogininfo]=useState(false);
 
  return (
    <LoginContext.Provider value={{logininfo,setLogininfo}}>
      <Children />
    </LoginContext.Provider>
  )
}

export default LoginProvider
