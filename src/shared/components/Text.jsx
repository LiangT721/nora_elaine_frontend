import React, { useContext, useEffect, useState } from "react";
import { languageContext } from "../hooks/useLanguage";

const Text = (props) => {
  const { lanState } = useContext(languageContext);
  const [displayContent, setDisplayConent] = useState(props.children);
  const eng = lanState.lan;

  useEffect(() => {
    if (typeof displayContent === "string" && displayContent.includes("|")) {
      setDisplayConent(displayContent.split("|"));
    }
  }, [displayContent]);

  return (
    <div className={`text ${props.className}`} style={props.style}>
      {typeof displayContent === "string"
        ? displayContent
        : eng
        ? displayContent[0]
        : displayContent[1]}
    </div>
  );
};

export default Text;
