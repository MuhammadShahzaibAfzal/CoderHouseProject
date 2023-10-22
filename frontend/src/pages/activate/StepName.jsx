import React from "react";
import { Button, Card } from "../../components";

const StepName = ({ onNext }) => {
  return (
    <Card title="Enter Name">
      Step Name
      <Button title="Next" onClick={onNext} />
    </Card>
  );
};

export default StepName;
