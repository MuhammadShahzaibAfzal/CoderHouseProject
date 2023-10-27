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
    if (!otp) {
      toast.error("Please enter otp first !");
      return;
    }
    const promise = verifyOTP({
      phone,
      hash,
      otp,
    });
    toast.promise(promise, {
      loading: "Verifying...",
      success: (data) => {
        dispatch(setAuth(data?.data));
        return "OTP verified";
      },
      error: (err) => {
        console.log(err);
        return err?.response?.data?.message || "Something went wrong !";
      },
    });
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
