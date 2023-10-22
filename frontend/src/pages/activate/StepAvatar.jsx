import React from "react";
import { Button, Card } from "../../components";

const StepAvatar = ({ onNext }) => {
  return (
    <Card title="Avatar">
      Avatar
      <Button title="Next" onClick={onNext} />
    </Card>
  );
};

export default StepAvatar;
