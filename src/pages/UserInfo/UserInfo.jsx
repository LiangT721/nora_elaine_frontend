import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/useForm";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useCookies } from "react-cookie";
import { authContext } from "../../shared/hooks/Auth";
import { URL } from "../../variable";

import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import Text from "../../shared/components/Text";
import LanguageToggle from "../../shared/components/LanguageToggle";
import UserSignUp from "../../components/UserSignUp";
import PopUpBG from "../../shared/components/PopUpBG";

const UserInfo = () => {
  const [invalidAlarm, setInvalidAlarm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [, setCookie] = useCookies(["token"]);
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const loginHandler = async (event) => {
    if (formState.isValid) {
      event.preventDefault();
      try {
        const res = await sendRequest(
          `${URL}api/users/login`,
          "POST",
          JSON.stringify({
            username: formState.inputs.username.value,
            password: formState.inputs.password.value
          }),
          { "Content-Type": "application/json" }
        );

        // console.log(res.loginInfo);
        const now = new Date();
        const time = now.getTime();
        const expireTime = time + 60 * 60 * 1000;
        setCookie("token", res.loginInfo.token, expireTime);
        dispatch({
          type: "LOGIN",
          value: {
            token: res.loginInfo.token,
            userInfo: res.loginInfo
          }
        });
        // console.log(authState);
        navigate("/upload");
      } catch (error) {
        console.log(error);
      }
    } else {
      setInvalidAlarm(true);
      console.log("error");
    }
  };

  return (
    <div className="user-info">
      {!isLogin && <PopUpBG />}
      <UserSignUp
        className={`${!isLogin && "signUp__container__enter"}`}
        closePopUp={() => setIsLogin(true)}
      />
      <div className="user-info__container">
        <LanguageToggle className="user-info__language-toggle" />
        <form action="#" className="form login__form" onSubmit={loginHandler}>
          <Text className="form__heading mb-sm">{["Login", "登录"]}</Text>
          <Input
            className="login__username"
            label="username"
            id="username"
            placeholder="username"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            alarm={invalidAlarm}
          />
          <Input
            className="login__password"
            label="password"
            id="password"
            placeholder="password"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            alarm={invalidAlarm}
          />
          <Button className="button login__btn" type="submit">
            submit
          </Button>
        </form>
        <div className="bottom__btns">
          <Link to="/" className="button">
            home
          </Link>
          <div
            className="page-link sign-up__btn"
            onClick={() => setIsLogin(false)}
          >
            &#10141; <u>Sign up</u>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
