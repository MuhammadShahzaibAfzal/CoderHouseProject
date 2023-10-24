import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Card, TextInput } from "../../components";
import phoneImage from "../../assets/phone.png";
import { sendOTP } from "../../http";
import { setOtp } from "../../store/slices/authSlice";
import toast from "react-hot-toast";

const Phone = ({ onNext }) => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  async function submit() {
    // server request
    try {
      const { data } = await sendOTP({ phone });
      dispatch(setOtp(data));
      console.log(data);
      onNext();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  return (
    <Card title="Enter your phone number" image={phoneImage}>
      <TextInput
        placeholder="Enter your phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button title="Next" onClick={submit} />
      <p className="txtSecondary bottomParagraph">
        By entering your number, you’re agreeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Phone;
