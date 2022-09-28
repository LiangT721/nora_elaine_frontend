import React from "react";

const Text = props => {
  const eng = true
  return(
    <div className={`text ${props.className}`} style={props.style}>
      { typeof(props.children)==="string" ? props.children :
         eng? props.children[0]: props.children[1]}
    </div>
  )
}

export default Text;