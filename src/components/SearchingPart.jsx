import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { URL, category } from "../variable";
import Text from "../shared/components/Text";
import { useHttpClient } from "../shared/hooks/http-hook";
import { languageContext } from "../shared/hooks/useLanguage";

const SearchingPart = (props) => {
  const { user } = useParams();
  const uid = user.split("|")[1];
  const { sendRequest } = useHttpClient();
  const { lanState } = useContext(languageContext);
  const [keyWords, setKeyWords] = useState([]);
  const [condition, setCondition] = useState("");
  const [searchContent, setSearchContent] = useState("")

  const { setDisplayList, setIsDefaultList, isNora } = props;
  const eng = lanState.lan;

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
      console.clear();
      setDisplayList(res.paintingList);
      setIsDefaultList(false);
    } catch (err) {
      alert(err);
    }
  };

  const categorySearch = async (el) => {
    setSearchContent(el)
    const content = el.replaceAll(" ", "%20");
    try {
      const res = await sendRequest(
        `${URL}api/paintings/category/${uid}^${content}`,
        "GET"
      );
      setDisplayList(res.paintingList);
      setIsDefaultList(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const KeyWordres = await sendRequest(
          `${URL}api/paintings/keyword/${uid}`,
          "GET"
        );
        setKeyWords(KeyWordres.keywordList.slice(0, 8));
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, [sendRequest, uid]);

  return (
    <div className="painting-searching-part">
      <div className="painting__searchingbar">
        <input
          type="text"
          className="painting__searchinput"
          onChange={handleChange}
          placeholder={eng ? "Search content" : "请输入您要搜索的内容"}
        />
        <button className={`button ${!isNora&&"painting__btn__elaine"}`} onClick={() => search(condition)}>
          Search
        </button>
      </div>
      <div className="painting__categorys">
        {category.map((el) => (
          <div
            className={`painting__category ${isNora&&"painting__category__nora"} ${el===searchContent&&!isNora&& "painting__category__selected"} ${el===searchContent&&isNora&& "painting__category__nora__selected"}`}
            key={el}
            onClick={() => categorySearch(el)}
          >
            <Text>{el}</Text>
          </div>
        ))}
      </div>
      <div className="painting__keywords">
        {keyWords.length > 0 &&
          keyWords.map((el) => (
            <div
              className="painting__keyword"
              key={el._id}
              onClick={() => search(el._id)}
            >
              <Text>{el._id}</Text>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchingPart;
