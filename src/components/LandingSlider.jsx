import React, { useState } from "react";
import Slider from "react-touch-drag-slider";
import { URL } from "../variable";
import SvgIcons from "../assets/svgs/symbol-defs.svg";

const LandingSlider = (props) => {
  const { list } = props;
  const [index, setIndex] = useState(0);

  const setFinishedIndex = (i) => {
    console.log("finished dragging on slide", i);
    setIndex(i);
  };
  const next = () => {
    console.log("next");
    if (index < list.length - 1) setIndex(index + 1);
  };

  const previous = () => {
    if (index > 0) setIndex(index - 1);
  };
  return (
    <div className={`landing-slider ${props.className}`}>
      <button
        className="landing-slider__button landing-slider__button-left"
        onClick={previous}
        disabled={index === 0}
      >
        <svg
          className={`landing-slider__button__icon landing-slider__button__${props.creator}`}
        >
          <use xlinkHref={`${SvgIcons}#icon-arrow-left`}></use>
        </svg>
      </button>
      <button
        className="landing-slider__button landing-slider__button-right"
        onClick={next}
        disabled={index === list.length - 1}
      >
        <svg
          className={`landing-slider__button__icon landing-slider__button__${props.creator}`}
        >
          <use xlinkHref={`${SvgIcons}#icon-arrow-right`}></use>
        </svg>
      </button>
      <Slider
        className="landing-slider__container"
        onSlideComplete={setFinishedIndex}
        onSlideStart={(index) => {
          console.log("started dragging on slide", index);
        }}
        activeIndex={index}
        threshHold={100}
        transition={0.5}
        scaleOnDrag={false}
      >
        {list.map((el, index) => (
          <div className="landing-slider__item " key={el._id}>
            {
              <img
                className="landing-slider__img"
                src={`${URL}api/${el.imagePreview}`}
                key={el._id}
                alt=""
              />
            }
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LandingSlider;
