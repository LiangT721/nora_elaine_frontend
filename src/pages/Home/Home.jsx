import React from "react";

import { Link } from "react-router-dom";

const Home = () => {
  return(
    <div className="home">
      homepage
      <Link to="/upload" className="page-link">upload</Link>
    </div>
  )
}

export default Home;