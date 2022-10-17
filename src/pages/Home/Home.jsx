import React from "react";
import LandingGallery from "../../components/LandingGallery";
import LanguageToggle from "../../shared/components/LanguageToggle";

const Home = () => {
  return (
    <div className="home">
        <LanguageToggle className="home__toggle" />
      <LandingGallery />
    </div>
  );
};

export default Home;
