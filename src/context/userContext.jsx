import { createContext, useState, useEffect } from "react";

export const userContext = createContext();

export default function UserContextProvider(props) {
  const [isLogin, setLogin] = useState(false); // default to false

  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setLogin(true);
    }
  }, []);

  return (
    <userContext.Provider value={{ isLogin, setLogin }}>
      {props.children}
    </userContext.Provider>
  );
}
