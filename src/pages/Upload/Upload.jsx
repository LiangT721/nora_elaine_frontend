import React, { useState, useContext } from "react";
import Button from "../../shared/components/Button";
import ImageUpload from "../../shared/components/ImageUpload";
import Input from "../../shared/components/Input";
import LanguageToggle from "../../shared/components/LanguageToggle";
import Text from "../../shared/components/Text";
import { Link } from "react-router-dom";

import { useForm } from "../../shared/hooks/useForm";
import { languageContext } from "../../shared/hooks/useLanguage";

import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

const Upload = () => {
  const [invalidAlarm, setInvalidAlarm] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      creator: {
        value: "",
        isValid: false
      },
      created_date: {
        value: "",
        isValid: false
      },
      category: {
        value: "",
        isValid: false
      },
      content: {
        value: "",
        isValid: false
      },
      key_word_1: {
        value: "",
        isValid: true
      },
      key_word_2: {
        value: "",
        isValid: true
      },
      key_word_3: {
        value: "",
        isValid: true
      },
      image: {
        value: null,
        isValid: false
      },
      imagePreview: {
        value: null,
        inValid: false
      }
    },
    false
  );
  const{lanState} = useContext(languageContext)

  const paintingUploadSubmitHandler = async () => {
    if (formState.isValid) {
      console.log(formState.inputs);
    } else {
      setInvalidAlarm(true);
      console.log("error");
    }
  };

  const imageUpload = (images) => {
    inputHandler(images.file.id, images.file.value, images.file.isValid);
    inputHandler(
      images.previewFile.id,
      images.previewFile.value,
      images.previewFile.isValid
    );
  };

  return (
    <div className="upload">
      <LanguageToggle />
      <form
        action="#"
        className="upload__form"
        onSubmit={paintingUploadSubmitHandler}
      >
        <Text className="upload__heading mb-sm">
          {["Painting Upload", "图片上传"]}
        </Text>
        <Input
          className="upload__creator"
          label="creator"
          id="creator"
          placeholder="creator"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          alarm={invalidAlarm}
        />
        <Input
          label="created date"
          id="created_date"
          placeholder="created date"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          alarm={invalidAlarm}
        />
        <Input
          label="category"
          id="category"
          placeholder="category"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          alarm={invalidAlarm}
        />
        <Input
          label="content"
          id="content"
          placeholder="content"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          alarm={invalidAlarm}
        />
        <Input
          label="key word 1"
          id="key_word_1"
          placeholder="key word 1"
          onInput={inputHandler}
          initialValid={true}
          validators={[]}
        />
        <Input
          label="key word 2"
          id="key_word_2"
          placeholder="key word 2"
          onInput={inputHandler}
          initialValid={true}
          validators={[]}
        />
        <Input
          label="key word 3"
          id="key_word_3"
          placeholder="key word 3"
          onInput={inputHandler}
          initialValid={true}
          validators={[]}
        />
        <ImageUpload
          className="upload__image"
          id="image"
          imageUpload={imageUpload}
          alarm={invalidAlarm}
        />
        <Button className="upload__btn" type="submit">
          Upload
        </Button>
      </form>
      <div className="upload__bottom__btns">
      <p>{ lanState.lan? "english" : "chinese"}</p>
        <Link to="/" className="page-link upload__link">
          &#10141; <u>home</u>{" "}
        </Link>
      </div>
    </div>
  );
};

export default Upload;
