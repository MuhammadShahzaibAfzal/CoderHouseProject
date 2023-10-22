import React, { useState } from "react";
import StepPhoneEmail from "./StepPhoneEmail";
import StepOTP from "./StepOTP";

const steps = {
  1: StepPhoneEmail,
  2: StepOTP,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  return (
    <div className="cardWrapper">
      <Step
        onNext={() => {
          setStep(step + 1);
        }}
      />
    </div>
  );
};

export default Authenticate;
