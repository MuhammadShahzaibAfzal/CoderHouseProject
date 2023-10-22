import React from "react";
import { Button, Card } from "../../components";

const StepOTP = ({ onNext }) => {
  return (
    <Card title="Enter OTP">
      Step OTP
      <Button title="Next" onClick={onNext} />
    </Card>
  );
};

export default StepOTP;
