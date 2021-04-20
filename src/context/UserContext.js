import React from "react";
import { toast } from "react-toastify";
import api from "../services/api";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return toast.error('Falha na autenticação, verifique seu email/senha');
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

async function loginUser(dispatch, email, password, history, setIsLoading) {
  setIsLoading(true);

  try {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    setTimeout(() => {
      api.defaults.headers.Authorization = `Baerer ${token}`;

      localStorage.setItem('id_token', user.id);
      localStorage.setItem('name_user', user.name);
      setIsLoading(false);
      dispatch({ type: 'LOGIN_SUCCESS' });

      history.push('/app/dashboard');
    }, 1000);
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE" });
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  localStorage.removeItem("name_user");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
