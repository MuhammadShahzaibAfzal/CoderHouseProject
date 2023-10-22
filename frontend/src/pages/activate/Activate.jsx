import React, { useState } from "react";
import StepName from "./StepName";
import StepAvatar from "./StepAvatar";

const steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
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

export default Activate;
