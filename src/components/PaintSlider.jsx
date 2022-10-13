import React, { useState, useContext } from "react";
import Slider from "react-touch-drag-slider";
import { URL } from "../variable";
import Text from "../shared/components/Text";
import { authContext } from "../shared/hooks/Auth";
import PaintingUpdate from "./PaintingUpdate";

const PaintingSlider = (props) => {
  const { list, startIndex, cancelImage, displayListUpdate } = props;
  const [index, setIndex] = useState(startIndex);
  const { authState } = useContext(authContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [paintingUpdate, setPaintingUpdate] = useState({});

  const setFinishedIndex = (i) => {
    console.log("finished dragging on slide", i);
    setIndex(i);
  };
  const next = () => {
    console.log(index);
    if (index < list.length - 1) setIndex(index + 1);
  };

  const previous = () => {
    console.log(index);
    if (index > 0) setIndex(index - 1);
  };

  const paintingEdit = () => {
    const painting = list[index];
    console.log(painting);
    painting.token = authState.token;
    setIsUpdate(true);
    setPaintingUpdate(painting);
  };

  const exitEdit = () => {
    setPaintingUpdate({});
    setIsUpdate(false);
    cancelImage();
  };

  console.log("render", index);
  return (
    <div className="painting-slider">
      {isUpdate && (
        <div className="update-bg">
          <PaintingUpdate
            index={index}
            painting={paintingUpdate}
            exitEdit={exitEdit}
            displayListUpdate={displayListUpdate}
          />
        </div>
      )}
      <div className="painting-slider__exit" onClick={cancelImage}></div>
      {authState.userInfo.user_id === list[0].user && (
        <div className="painting-slider__edit" onClick={() => paintingEdit()}>
          Edit
        </div>
      )}
      <button
        className="painting-slider__button painting-slider__button-left"
        onClick={previous}
        disabled={index === 0}
      >
        〈
      </button>
      <button
        className="painting-slider__button painting-slider__button-right"
        onClick={next}
        disabled={index === list.length - 1}
      >
        〉
      </button>
      <Slider
        className="painting-slider"
        onSlideComplete={setFinishedIndex}
        onSlideStart={(index) => {
          console.log("started dragging on slide", index);
        }}
        activeIndex={index}
        threshHold={100}
        transition={0.5}
        scaleOnDrag={true}
      >
        {list.map((el, index) => (
          <div className="painting-slider__container" key={el._id}>
            <img
              className="painting-slider__img"
              src={`${URL}api/${el.image}`}
              alt=""
            />
            <div className="painting-slider__info">
              <div className="painting-slider__name">
                <Text className="painting-slider__title">
                  {["name", "名称"]}
                </Text>
                <Text className="painting-slider__content painting-slider__content__name">
                  {el.name}
                </Text>
              </div>
              <div>
                <Text className="painting-slider__title">
                  {["Creator", "作者"]}
                </Text>
                <Text className="painting-slider__content">{el.creator}</Text>
              </div>
              <div>
                <Text className="painting-slider__title">
                  {["category", "类型"]}
                </Text>
                <Text className="painting-slider__content">{el.category}</Text>
              </div>
              <div>
                <Text className="painting-slider__title">
                  {["content", "内容"]}
                </Text>
                <Text className="painting-slider__content">{el.content}</Text>
              </div>
              <div>
                <Text className="painting-slider__title">
                  {["created date", "创作日期"]}
                </Text>
                <Text className="painting-slider__content">
                  {el.created_date}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PaintingSlider;
