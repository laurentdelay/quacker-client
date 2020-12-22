import React, { createContext, useContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SET_AUTH_ERROR":
      return {
        ...state,
        authErrorMessage: action.payload,
      };

    case "CLEAR_ERROR":
      return { ...state, authErrorMessage: "" };
    default:
      break;
  }
};

const initialState = { user: null, authErrorMessage: "" };
const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < new Date().getTime()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
  };

  const checkAuth = (errorMessage) => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 > new Date().getTime()) {
        return true;
      }

      localStorage.removeItem("token");
    }
    dispatch({
      type: "SET_AUTH_ERROR",
      payload: errorMessage,
    });

    return false;
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
    dispatch({ type: "LOGOUT" });
  };

  const contextValues = {
    user: state.user,
    authErrorMessage: state.authErrorMessage,
    login,
    logout,
    checkAuth,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
