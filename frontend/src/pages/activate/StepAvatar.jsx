import React, { useState } from "react";
import { Button, Card } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../../assets/monkey-avatar.png";
import monkeyEmoji from "../../assets/monkey-emoji.png";
import { setAvatar } from "../../store/slices/activateSlice";
import { activate } from "../../http";
import { setAuth } from "../../store/slices/authSlice";

const StepAvatar = () => {
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState(avatar ? avatar : defaultAvatar);
  const dispatch = useDispatch();

  function captureImage(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = function () {
      // console.log(fileReader.result);
      setImage(fileReader.result);
      dispatch(setAvatar(fileReader.result));
    };
  }

  async function submit() {
    try {
      const { data } = await activate({ name, avatar });
      dispatch(setAuth(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card title={`Okay, ${name} !`} image={monkeyEmoji}>
      <span className="txtSecondary">How's this photo ?</span>
      <div className="avatarWrapper">
        <img src={image} alt="" />
      </div>
      <label htmlFor="avatar" className="fileLabel">
        Select an image
      </label>
      <input
        type="file"
        id="avatar"
        className="fileInput"
        onChange={captureImage}
      />
      <Button title="Next" onClick={submit} />
    </Card>
  );
};

export default StepAvatar;
