import React, { useState } from "react";
import Phone from "./Phone";
import Email from "./Email";
import { AiFillMail } from "react-icons/ai";
import { BsFillPhoneFill } from "react-icons/bs";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];
  return (
    <div>
      <div className="tabContainer">
        <button
          className={`btn ${type === "phone" && "btnPrimary"} txtPrimary`}
          onClick={() => {
            setType("phone");
          }}
          style={{ fontSize: "20px" }}
        >
          <BsFillPhoneFill />
        </button>
        <button
          className={`btn ${type === "email" && "btnPrimary"} txtPrimary`}
          onClick={() => {
            setType("email");
          }}
          style={{ fontSize: "20px" }}
        >
          <AiFillMail />
        </button>
      </div>
      <Component onNext={onNext} />
    </div>
  );
};

export default StepPhoneEmail;
