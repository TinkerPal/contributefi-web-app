import { useEffect, useState } from "react";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "@/lib/utils";
import { AuthContext } from "@/hooks/useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(getItemFromLocalStorage("email"));
  const [otp, setOtp] = useState(getItemFromLocalStorage("otp"));
  const [username, setUsername] = useState(getItemFromLocalStorage("username"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = getItemFromLocalStorage("accessToken");
    const savedUser = getItemFromLocalStorage("user");

    if (savedToken) {
      setToken(savedToken);
      setUser(savedUser || null);
    }

    setLoading(false);
  }, []);

  const login = ({ token, email, user, otp, username }) => {
    setToken(token || null);
    setUser(user || null);
    setEmail(email || null);
    setOtp(otp || null);
    setUsername(username || null);
    if (token) setItemInLocalStorage("accessToken", token);
    if (user) setItemInLocalStorage("user", user);
    if (email) setItemInLocalStorage("email", email);
    if (otp) setItemInLocalStorage("otp", otp);
    if (username) setItemInLocalStorage("username", username);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setEmail(null);
    setOtp(null);
    setUsername(null);
    removeItemFromLocalStorage("accessToken");
    removeItemFromLocalStorage("users");
    removeItemFromLocalStorage("email");
    removeItemFromLocalStorage("otp");
    removeItemFromLocalStorage("username");
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
        loading,
        email,
        otp,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
