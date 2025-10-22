import { useContext, createContext } from "react";

// Hook for using context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
