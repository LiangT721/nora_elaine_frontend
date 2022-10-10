import React, { useCallback, useEffect, useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

import nora from "../assets/imgs/nora_portait.png";
import elaine from "../assets/imgs/elaine_portait.png";
import SvgIcons from "../assets/svgs/symbol-defs.svg";
import arrow from "../assets/imgs/arrow.png"
import { intro, URL } from "../variable";

import LandingSlider from "./LandingSlider";
import LanguageToggle from "../shared/components/LanguageToggle";
import Text from "../shared/components/Text";
import LandingBackground from "./landingBackground";

const LandingGallery = () => {
  const navigate = useNavigate();
  const { sendRequest } = useHttpClient();
  const [noralist, setNoraList] = useState([]);
  const [elainelist, setElaineList] = useState([]);
  const link = ["Click me for more","更多画作"]
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
      <svg
        className="landing-background landing-background-photo"
        onClick={() => navigate("/temp")}
      >
        <use xlinkHref={`${SvgIcons}#icon-pictures`}></use>
      </svg>
      <LanguageToggle className="landing-gallery__toggle" />
      {<LandingBackground />}
      <div className="landing-gallery__contents">
          <div className="landing-gallery__elaine">
            <div className="landing-gallery__elaine__intro">
              <Text className="landing-gallery__elaine__title">
                {intro.elaine.name}
              </Text>
             
              <div className="landing-gallery__elaine__link">
              <Text className="landing-gallery__elaine__link-text">{link}</Text>
              <img src={arrow} alt="" className="landing-gallery__elaine__link-arrow" />
              <img
              src={elaine}
              className="landing-gallery__elaine__link-img"
              alt="avater"
              onClick={() => navigate(`/user/${elainelist[0].user}`)}
            />
            </div>
              <div className="landing-gallery__elaine__text">
                <Text>{intro.elaine.intro}</Text>
              </div>
            </div>
            <LandingSlider
              className="landing-gallery__elaine__slider"
              list={elainelist}
              creator="elaine"
            />
          </div>
          <div className="landing-gallery__nora">
            <LandingSlider
              className="landing-gallery__nora__slider"
              list={noralist}
              creator="nora"
            />
            <div className="landing-gallery__nora__intro">
              <div className="landing-gallery__nora__text">
                <Text>{intro.nora.intro}</Text>
                </div>
                <div className="landing-gallery__nora__link">
                <Text className="landing-gallery__nora__link-text">{link}</Text>
                <img src={arrow} alt="" className="landing-gallery__nora__link-arrow" />
                <img
                  src={nora}
                  className="landing-gallery__nora__link-img"
                  alt="avater"
                  onClick={() => navigate(`/user/${noralist[0].user}`)}
                />
              </div>

              <Text className="landing-gallery__nora__title">
                {intro.nora.name}
              </Text>
            </div>
          </div>
      </div>
    </div>
  );
};

export default LandingGallery;
