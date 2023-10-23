import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Card, TextInput } from "../../components";
import lockImage from "../../assets/lock-emoji.png";
import { verifyOTP } from "../../http";
import { setAuth } from "../../store/slices/authSlice";
import toast from "react-hot-toast";

const StepOTP = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const { phone, hash } = useSelector((state) => state.auth.otp);
  const dispatch = useDispatch();

  async function submit() {
    try {
      const { data } = await verifyOTP({
        phone,
        hash,
        otp,
      });
      dispatch(setAuth(data));
      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  return (
    <Card title="Enter the code we just texted you" image={lockImage}>
      <TextInput
        placeholder="Enter OTP"
        type="number"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <p className="txtSecondary" style={{ margin: "10px 0" }}>
        Didn’t receive?{" "}
        <span className="txtPrimary" style={{ cursor: "pointer" }}>
          Tap to resend
        </span>
      </p>
      <Button title="Next" onClick={submit} />
    </Card>
  );
};

export default StepOTP;
