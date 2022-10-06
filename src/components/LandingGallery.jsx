import React , { useCallback, useEffect, useState} from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useNavigate} from "react-router-dom";

import logo from "../assets/imgs/Nora&Elaine.png";
import nora from "../assets/imgs/nora_portait.png"
import elaine from "../assets/imgs/elaine_portait.png"
import SvgIcons from "../assets/svgs/symbol-defs.svg";
import { intro, URL } from "../variable";

import Slider from "../shared/components/slider";
import Text from "../shared/components/Text";

const LandingGallery = () => {
  const navigate = useNavigate();
  const { sendRequest } = useHttpClient();
  const [noralist, setNoraList] = useState([]);
  const [elainelist, setElaineList] = useState([]);
  const fetchPaintingsList = useCallback(async () => {
    try {
      const res = await sendRequest(`${URL}api/paintings`, "GET");
      setNoraList(res.lists.nora);
      setElaineList(res.lists.elaine);
    } catch (err) {
      console.log(err);
    }
  }, [sendRequest, setNoraList, setElaineList]);
  useEffect(() => {
    fetchPaintingsList();
  }, [fetchPaintingsList]);
  return (
    <div className="landing-gallery">
    <svg className="home__svgs home__svgs-photo" onClick={()=>navigate("/temp")}>
          <use xlinkHref={`${SvgIcons}#icon-pictures`}></use>
        </svg>
      <div className="landing-gallery__bg">
        <img src={logo} className="landing-gallery__logo" alt="avater" />
        <img src={nora} className="home__svgs home__svgs-nora" alt="avater" />
        <img src={elaine} className="home__svgs home__svgs-elaine" alt="avater" />
  
        <svg className="home__svgs home__svgs-bird">
          <use xlinkHref={`${SvgIcons}#icon-bird`}></use>
        </svg>
        <svg className="home__svgs home__svgs-music">
          <use xlinkHref={`${SvgIcons}#icon-music`}></use>
        </svg>
        <svg className="home__svgs home__svgs-gift">
          <use xlinkHref={`${SvgIcons}#icon-gift`}></use>
        </svg>
        <svg className="home__svgs home__svgs-pencil">
          <use xlinkHref={`${SvgIcons}#icon-pencil`}></use>
        </svg>
        <svg className="home__svgs home__svgs-lollipop">
          <use xlinkHref={`${SvgIcons}#icon-lollipop`}></use>
        </svg>
        <svg className="home__svgs home__svgs-headphone">
          <use xlinkHref={`${SvgIcons}#icon-headphone`}></use>
        </svg>
        <svg className="home__svgs home__svgs-cassette">
          <use xlinkHref={`${SvgIcons}#icon-cassette`}></use>
        </svg>
        <svg className="home__svgs home__svgs-planet">
          <use xlinkHref={`${SvgIcons}#icon-planet`}></use>
        </svg>
        <svg className="home__svgs home__svgs-pen">
          <use xlinkHref={`${SvgIcons}#icon-pen`}></use>
        </svg>
        <svg className="home__svgs home__svgs-snowflake">
          <use xlinkHref={`${SvgIcons}#icon-snowflake`}></use>
        </svg>
        <svg className="home__svgs home__svgs-film">
          <use xlinkHref={`${SvgIcons}#film`}></use>
        </svg>
      </div>
      <div className="landing-gallery__elaine">
        <div className="landing-gallery__elaine__intro">
          <Text className="landing-gallery__elaine__title">
            {intro.elaine.name}
          </Text>
          <div className="landing-gallery__elaine__text">
            <Text>{intro.elaine.intro}</Text>
          </div>
        </div>
        <Slider 
          className="landing-gallery__elaine__slider"
          creator="elaine"
          dots={false}
          list={elainelist}
        />
      </div>
      <div className="landing-gallery__nora">
        <div className="landing-gallery__nora__intro">
          <div className="landing-gallery__nora__text">
            <Text>{intro.nora.intro}</Text>
          </div>

          <Text className="landing-gallery__nora__title">
            {intro.nora.name}
          </Text>
        </div>
        <Slider 
        className="landing-gallery__nora__slider"
        creator="nora"
        dots={false}
        list={noralist}
      />
      </div>
    </div>
  );
};

export default LandingGallery;
