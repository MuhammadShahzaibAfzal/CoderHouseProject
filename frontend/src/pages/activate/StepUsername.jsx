import React from "react";
import { Button, Card } from "../../components";

const StepUsername = ({ onNext }) => {
  return (
    <Card title="Enter Username">
      Step StepUsername
      <Button title="Next" onClick={onNext} />
    </Card>
  );
};

export default StepUsername;
