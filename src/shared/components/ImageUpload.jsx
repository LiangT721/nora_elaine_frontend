import React, { useRef, useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";

import Button from "./Button";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      2000,
      2000,
      "jpg",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
  const resizePreViewFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "jpg",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickerHandler = async(e) => {
    let images;
    if (e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0];
      console.log(file);
      const pickedFile = await resizeFile(file);
      const pickedPreviewFile = await resizePreViewFile(file)
      console.log(pickedFile)
      setFile(pickedFile);
      setIsValid(true);
      images = {
        file: {
          id:props.id,
          value:pickedFile,
          isValid:true
        },
        previewFile: {
          id:"imagePreview",
          value:pickedPreviewFile,
          isValid:true
        }
    }
    } else {
      setIsValid(false);
    }
    props.imageUpload(images);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
    console.log("click");
  };

  return (
    <div className={`image__upload ${props.className}`}>
      <input
        type="file"
        ref={filePickerRef}
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg, .png, .jpeg, .heic"
        onChange={pickerHandler}
      />
      <div className="image__upload__container">
        <div className="image__upload__preview">
          {previewUrl && <img src={previewUrl} alt="preview" />}
        </div>
        <Button
          alarm={!isValid && props.alarm}
          type="button"
          onClick={pickImageHandler}
        >
          {previewUrl ? "Re-pick a painting " : "Click me to pick a painting"}
        </Button>
      </div>
    </div>
  );
};
export default ImageUpload;
