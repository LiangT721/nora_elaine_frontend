import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { URL } from "../../variable";
import Nora from "../../assets/imgs/nora_portait.png";
import Elaine from "../../assets/imgs/elaine_portait.png";
import PaintingList from "../../components/PaintingList";
import SearchingPart from "../../components/SearchingPart";
import Text from "../../shared/components/Text";

const UserPainting = () => {
  const { uid } = useParams();
  const { sendRequest } = useHttpClient();
  const [skipNum, setSkipNum] = useState(0);
  const [defaultList, setDefaultList] = useState([]);
  const [isDefaultList, setIsDefaultList] = useState(true);
  const [displayList, setDisplayList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const isNora = uid === "633b4db76dbef6d81ddaa05e";

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          `${URL}api/paintings/${uid}^${skipNum}`,
          "GET"
        );
        setDisplayList((preDisplayList) => {
          return [...preDisplayList, ...res.paintingList];
        });
        setDefaultList((preDefaultList) => {
          return [...preDefaultList, ...res.paintingList];
        });
        setLoading(false);
        setHasMore(res.paintingList.length > 0);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [skipNum, uid, sendRequest]);

  const resetDisplay = () => {
    setDisplayList(defaultList);
    setIsDefaultList(true);
  };

  const displayListUpdate = (index,painting) => {
    console.log(displayList[index])
    const list = displayList;
    list[index] = painting;
    console.log(list[index])
    setDisplayList(list);
  }
  return (
    <div className={`user-painting ${isNora && "user-painting__norabg"}`}>
      <div className="user-painting__title" onClick={resetDisplay}>
        {isNora && <img className="user-painting__img" src={Nora} alt="icon" />}
        {isNora && (
          <Text
            className="user-painting__title__text"
            ChiStyle={"user-painting__title__text-chi"}
          >
            {["Nora", "汤一诺"]}
          </Text>
        )}
        {!isNora && (
          <img className="user-painting__img" src={Elaine} alt="icon" />
        )}
        {!isNora && (
          <Text
            className="user-painting__title__text"
            ChiStyle={"user-painting__title__text-chi"}
          >
            {["Elaine", "汤一冉"]}
          </Text>
        )}
        <div className="user-painting__link">
          <Link to="/" className="page-link user-painting__link-home">
            <Text>{["Home", "主页"]}</Text>
          </Link>
          <Link to="/userinfo" className="page-link user-painting__link-home">
            <Text className="page-link user-painting__link-home">
              {["login", "登录"]}
            </Text>
          </Link>
        </div>
      </div>
      <SearchingPart
        isNora={isNora}
        setDisplayList={setDisplayList}
        setIsDefaultList={setIsDefaultList}
      />
      <PaintingList
        list={displayList}
        loading={loading}
        hasMore={hasMore}
        setSkipNum={setSkipNum}
        isDefaultList={isDefaultList}
        displayListUpdate={displayListUpdate}
      />
      <div className="user-painting__loading">
        {loading ? (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        ) : (
          <p className="user-painting__loading-text">No more painting</p>
        )}
      </div>
    </div>
  );
};

export default UserPainting;
