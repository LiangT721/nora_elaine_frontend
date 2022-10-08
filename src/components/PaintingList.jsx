import React from "react";

import { URL } from "../variable";

const PaintingList =(props)=> {
  const { list } = props;
  return(
    <div className="painting-list">
      {list.length > 0 && 
        list.map(el=>
            <img 
            className="painting-list__img"
            src={`${URL}api/${el.imagePreview}`} alt="" 
            key={el._id} 
            />
        )
      }
    </div>
  )
}

export default PaintingList;