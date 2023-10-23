import React, { useState } from "react";
import { Button, Card, TextInput } from "../../components";
import emailImage from "../../assets/email-emoji.png";

const Email = ({ onNext }) => {
  const [email, setEmail] = useState("");
  return (
    <Card title="Enter your email" image={emailImage}>
      <TextInput
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button title="Next" onClick={onNext} />
      <p className="txtSecondary bottomParagraph">
        By entering your email, you’re agreeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Email;
