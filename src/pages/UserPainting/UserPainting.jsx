import React, {
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useOnScreen } from "../../shared/hooks/useOnScreen";

import { URL, category } from "../../variable";
import { languageContext } from "../../shared/hooks/useLanguage";
import Nora from "../../assets/imgs/nora_portait.png";
import PaintingList from "../../components/PaintingList";
import Text from "../../shared/components/Text";

const UserPainting = () => {
  const { uid } = useParams();
  const { sendRequest } = useHttpClient();
  const [displayList, setDisplayList] = useState([]);
  const [keyWords, setKeyWords] = useState([]);
  const [condition, setCondition] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const { lanState } = useContext(languageContext);
  const eng = lanState.lan;
  const ref = useRef();
  const onLoading = useOnScreen(ref);

  const fetchMore = async () => {
    console.log("fectchMore");
    const skip = displayList.length;
    try {
      const res = await await sendRequest(
        `${URL}api/paintings/${uid}^${skip}`,
        "GET"
      );
      res.paintingList.length === 0 && setIsFetching(false) 
      let newList = [...displayList, ...res.paintingList];
      setDisplayList(newList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      console.log("fetchData");
      try {
        const res = await sendRequest(`${URL}api/paintings/${uid}^0`, "GET");
        setDisplayList(res.paintingList);
        const KeyWordres = await sendRequest(
          `${URL}api/paintings/keyword`,
          "GET"
        );
        setKeyWords(KeyWordres.keywordList.slice(0, 8));
      } catch (err) {
        console.log(err);
      }
    };
    if (onLoading) {
      console.log(onLoading);
      console.log(displayList.length)
      isFetching && displayList.length >= 15 && fetchMore();
    }
    if (displayList.length === 0) {
      fetchData();
    }
  }, [sendRequest, uid, onLoading, fetchMore, displayList.length, isFetching]);



  const handleChange = (e) => {
    setCondition(e.target.value);
  };

  const search = async (el) => {
    const content = el.replaceAll(" ", "%20");
    try {
      const res = await sendRequest(
        `${URL}api/paintings/search/${uid}^${content}`,
        "GET"
      );
      setDisplayList(res.paintingList);
    } catch (err) {
      console.log(err);
    }
  };

  const categorySearch = async (el) => {
    const content = el.replaceAll(" ", "%20");
    try {
      const res = await sendRequest(
        `${URL}api/paintings/category/${uid}^${content}`,
        "GET"
      );
      setDisplayList(res.paintingList);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="user-painting">
      <div className="user-painting__title">
        <img className="user-painting__img" src={Nora} alt="icon" />
        <p className="user-painting__title__text">Nora</p>
      </div>
      <div className="user-painting__searchingbar">
        <input
          type="text"
          className="user-painting__searchinput"
          onChange={handleChange}
          placeholder={
            eng
              ? "Search content"
              : "请输入您要搜索的内容"
          }
        />
        <button className="button" onClick={() => search(condition)}>
          Search
        </button>
      </div>
      <div className="user-painting__categorys">
        {category.map((el) => (
          <div
            className="user-painting__category"
            key={el}
            onClick={() => categorySearch(el)}
          >
            <Text>{el}</Text>
          </div>
        ))}
      </div>
      <div className="user-painting__keywords">
        {keyWords.length > 0 &&
          keyWords.map((el) => (
            <div
              className="user-painting__keyword"
              key={el._id}
              onClick={() => search(el._id)}
            >
              <Text>{el._id}</Text>
            </div>
          ))}
      </div>
      <PaintingList list={displayList} />
      <div className="user-painting__loading" ref={ref}>
        {isFetching ? (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        ) : (
          <p className="user-painting__loading-text">No more painting</p>
        )}
      </div>
      <button
        onClick={() => {
          fetchMore();
        }}
      >
        add
      </button>
    </div>
  );
};

export default UserPainting;
