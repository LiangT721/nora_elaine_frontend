import React, { useRef, useCallback, useState } from "react";
import PopUpGB from "../shared/components/PopUpBG";
import Text from "../shared/components/Text";

import { URL } from "../variable";

const PaintingList = (props) => {
  const { list, loading, hasMore, setSkipNum, isDefaultList } = props;
  const [isImageDetail, setIsImageDetail] = useState(false);
  const [imageDetail, setImageDetail] = useState({});
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
    [loading, hasMore, isDefaultList, setSkipNum]
  );

  const selectImage = (el) => {
    console.log(el);
    setImageDetail(el);
    setIsImageDetail(true);
  };
  const cancelImage = () => {
    setImageDetail({});
    setIsImageDetail(false);
  };
  return (
    <div className="painting-list">
      {isImageDetail && (
        <PopUpGB onClick={cancelImage}>
          <div className="image-detail">
            <img
              className="image-detail__img"
              src={`${URL}api/${imageDetail.image}`}
              alt=""
            />
            <div className="image-detail__info">
              <div className="image-detail__name">
                <Text className="image-detail__title" >{["name", "名称"]}</Text>
                <Text className="image-detail__content image-detail__content__name">
                  {imageDetail.name}
                </Text>
              </div>
              <div>
                <Text className="image-detail__title">
                  {["Creator", "作者"]}
                </Text>
                <Text className="image-detail__content">
                  {imageDetail.creator}
                </Text>
              </div>
              <div>
                <Text className="image-detail__title">
                  {["category", "类型"]}
                </Text>
                <Text className="image-detail__content">
                  {imageDetail.category}
                </Text>
              </div>
              <div>
                <Text className="image-detail__title">
                  {["content", "内容"]}
                </Text>
                <Text className="image-detail__content">
                  {imageDetail.content}
                </Text>
              </div>
              <div>
                <Text className="image-detail__title">
                  {["created date", "创作日期"]}
                </Text>
                <Text className="image-detail__content">
                  {imageDetail.created_date}
                </Text>
              </div>
            </div>
          </div>
        </PopUpGB>
      )}
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
                onClick={() => {
                  selectImage(el);
                }}
              />
            );
          } else {
            return (
              <img
                className="painting-list__img"
                src={`${URL}api/${el.imagePreview}`}
                alt=""
                key={el._id}
                onClick={() => {
                  selectImage(el);
                }}
              />
            );
          }
        })}
    </div>
  );
};

export default PaintingList;
