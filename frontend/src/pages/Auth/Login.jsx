import React, { useState } from "react";
import StepPhoneEmail from "./StepPhoneEmail";
import StepOTP from "./StepOTP";

const steps = {
  1: StepPhoneEmail,
  2: StepOTP,
};

const Login = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }
  return (
    <div className="cardWrapper">
      <Step onNext={onNext} />
    </div>
  );
};

export default Login;
