import React, { useState } from "react";
import StepPhoneEmail from "./StepPhoneEmail";
import StepOTP from "./StepOTP";
import StepName from "./StepName";
import StepAvatar from "./StepAvatar";
import StepUsername from "./StepUsername";

const steps = {
  1: StepPhoneEmail,
  2: StepOTP,
  3: StepName,
  4: StepAvatar,
  5: StepUsername,
};
const Register = () => {
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

export default Register;
