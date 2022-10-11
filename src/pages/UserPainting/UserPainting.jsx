import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { URL } from "../../variable";
import Nora from "../../assets/imgs/nora_portait.png";
import Elaine from "../../assets/imgs/elaine_portait.png";
import PaintingList from "../../components/PaintingList";
import SearchingPart from "../../components/SearchingPart";
import Text from "../../shared/components/Text";

const UserPainting = () => {
  const { uid } = useParams();
  const navigate = useNavigate()
  const [isNora, setIsNora] = useState(uid === "633b4db76dbef6d81ddaa05e");
  const { sendRequest } = useHttpClient();
  const [skipNum, setSkipNum] = useState(0);
  const [defaultList, setDefaultList] = useState([]);
  const [isDefaultList, setIsDefaultList] = useState(true);
  const [displayList, setDisplayList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // const onLoading = useOnScreen(ref);
  console.log(isNora);

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
  return (
    <div className={`user-painting ${isNora && "user-painting__norabg"}`}>
      <div className="user-painting__title" onClick={resetDisplay}>
        {isNora && <img className="user-painting__img" src={Nora} alt="icon" />}
        {isNora && (
          <Text className="user-painting__title__text">
            {["Nora", "汤一诺"]}
          </Text>
        )}
        {!isNora && (
          <img className="user-painting__img" src={Elaine} alt="icon" />
        )}
        {!isNora && (
          <Text className="user-painting__title__text">
            {["Elaine", "汤一冉"]}
          </Text>
        )}
        <div className="user-painting__link">
          <a className="page-link user-painting__link-home"
            onClick={()=>navigate('/')}
          > <u>home</u></a>
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
