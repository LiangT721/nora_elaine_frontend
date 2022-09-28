import React, { useContext} from "react";
import { languageContext } from "../hooks/useLanguage";

const LanguageToggle = () => {
  const { lanState, dispatch } = useContext(languageContext);
  return(
    <div className="language-toggle">
      <p>{ lanState.lan? "english" : "chinese"}</p>
      <button className="button" onClick={()=>dispatch({
        type:"LAN_TOGGLE"
      })} >english</button>
    </div>
  )
}

export default LanguageToggle;