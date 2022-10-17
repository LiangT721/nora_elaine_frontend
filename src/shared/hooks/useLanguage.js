import React, { useReducer } from "react";
import { useCookies } from "react-cookie";

const languageContext = React.createContext();

const languageReducer = (state, action) => {
  switch (action.type) {
    case "LAN_TOGGLE":
      const preLan = state.lan;
      return {
        ...state,
        lan: !preLan
      };
    default:
      return state;
  }
};

const LanguageProvider = (props) => {
  const [cookies] = useCookies(["lang"]);
  const [lanState, dispatch] = useReducer(languageReducer, {
    lan: !cookies.lang || cookies.lang === "true" || false
  });
  return (
    <languageContext.Provider value={{ lanState, dispatch }}>
      {props.children}
    </languageContext.Provider>
  );
};

export { languageContext, LanguageProvider };
