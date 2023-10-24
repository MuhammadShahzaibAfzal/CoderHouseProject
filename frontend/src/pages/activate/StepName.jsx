import React, { useState } from "react";
import { Button, Card, TextInput } from "../../components";
import image from "../../assets/goggle-emoji.png";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../store/slices/activateSlice";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const [fullName, setFullName] = useState(name);
  const dispatch = useDispatch();

  function submit() {
    if (!fullName) {
      return;
    }
    dispatch(setName(fullName));
    onNext();
  }
  return (
    <Card title="What’s your full name?" image={image}>
      <TextInput
        placeholder="Your Full Name"
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value);
        }}
      />
      <p className="txtSecondary">People use real names at codershouse :) </p>
      <Button title="Next" onClick={submit} />
    </Card>
  );
};

export default StepName;
