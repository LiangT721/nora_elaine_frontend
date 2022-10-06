import React, { useState } from "react";

import { URL } from "../../variable";
import SvgIcons from "../../assets/svgs/symbol-defs.svg";

const Slider = (props) => {
  const { list } = props;
  const [pre, setPre] = useState(list.length - 1);
  const [cur, setCur] = useState(0);
  const [next, setNext] = useState(1);

  const Next = () => {
    console.log("start");
    if (cur >= 0 && cur < list.length - 2) {
      setPre(cur);
      setCur(cur + 1);
      setNext(next + 1);
    }
    if (cur === list.length - 2) {
      setPre(cur);
      setCur(cur + 1);
      setNext(0);
    }
    if (cur === list.length - 1) {
      setPre(list.length - 1);
      setCur(0);
      setNext(next + 1);
    }
  };
  const Pre = () => {
    if (cur === 0) {
      setNext(cur);
      setPre(list.length - 2);
      setCur(list.length - 1);
    }
    if (cur > 1 && cur <= list.length - 1) {
      setNext(cur);
      setPre(pre - 1);
      setCur(cur - 1);
    }
    if (cur === 1) {
      setPre(list.length - 1);
      setCur(cur - 1);
      setNext(next - 1);
    }
  };
  const select = (index) => {
    setCur(index);
    switch (index) {
      case 0:
        setPre(list.length - 1);
        setNext(index + 1);
        break;
      case list.length - 1:
        setPre(index - 1);
        setNext(0);
        break;
      default:
        setPre(index - 1);
        setNext(index + 1);
        break;
    }
  };
  return (
    <div className={`slider__div ${props.className}`}>
      <div className="slider__container">
        {list &&
          list.map((el, index) => (
            <div
              key={el._id}
              className={`slider__item ${pre === index && "preSlider"} ${
                cur === index && "curSlider"
              } ${next === index && "nextSlider"}`}
            >
              <img className={`slider__img__${props.creator}`} src={`${URL}api/${el.imagePreview}`} alt="" />
            </div>
          ))}
      </div>
      <div className="slider__btns">
        <svg className={`slider__btns__pre slider__btns__${props.creator}`} onClick={Pre}>
          <use xlinkHref={`${SvgIcons}#icon-arrow-left`}></use>
        </svg>
        <svg className={`slider__btns__next slider__btns__${props.creator}`} onClick={Next}>
          <use xlinkHref={`${SvgIcons}#icon-arrow-right`}></use>
        </svg>
        {props.dots && <div className="slider__btns__selects">
          {list.map((el, index) => (
            <span
              key={index}
              className="dot"
              onClick={() => select(index)}
            ></span>
          ))}
        </div>}
      </div>
    </div>
  );
};
export default Slider;
