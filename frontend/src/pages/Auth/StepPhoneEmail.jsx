import React from "react";
import { Button, Card } from "../../components";

const StepPhoneEmail = ({ onNext }) => {
  return (
    <Card title="Enter Phone Number">
      Step Phone and Email
      <Button title="Next" onClick={onNext} />
    </Card>
  );
};

export default StepPhoneEmail;
