import React, { useRef,useCallback } from "react";

import { URL } from "../variable";

const PaintingList = (props) => {
  const { list, loading, hasMore, setSkipNum,isDefaultList } = props;

  const observer = useRef();
  const lastRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && isDefaultList) {
          setSkipNum((prevSkipNum) => prevSkipNum + 15);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, isDefaultList,setSkipNum]
  );
  return (
    <div className="painting-list">
      {list.length > 0 &&
        list.map((el, index) => {
          if (list.length === index + 1) {
            return (
              <img
                ref={lastRef}
                className="painting-list__img"
                src={`${URL}api/${el.imagePreview}`}
                alt=""
                key={el._id}
              />
            );
          } else {
            return (
              <img
                className="painting-list__img"
                src={`${URL}api/${el.imagePreview}`}
                alt=""
                key={el._id}
              />
            );
          }
        })}
    </div>
  );
};

export default PaintingList;
