import React, { useContext, useEffect } from "react";
import { languageContext } from "../hooks/useLanguage";
import { useCookies } from "react-cookie";

const LanguageToggle = (props) => {
  const { lanState, dispatch } = useContext(languageContext);
  const [, setCookie] = useCookies(["lang"]);
  useEffect(() => {
    
  },[])
  return (
    <div className={`language-toggle ${props.className}`}>
      <button
        className="button language-toggle__btn"
        onClick={() => {
          dispatch({
            type: "LAN_TOGGLE"
          });
          setCookie('lang',!lanState.lan)
        }}
      >
        {lanState.lan ? "English" : "中文"} &#10095;{" "}
        {lanState.lan ? "中文" : "English"}
      </button>
    </div>
  );
};

export default LanguageToggle;
