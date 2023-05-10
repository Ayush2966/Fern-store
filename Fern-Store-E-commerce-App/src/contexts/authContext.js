import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    isAuth: false
  });
  useEffect(() => {
    setAuth({
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user")),
      isAuth: localStorage.getItem("isAuth")
    })
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>)
}
export { AuthContextProvider, useAuth };