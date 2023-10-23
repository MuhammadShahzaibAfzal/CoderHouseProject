import React from "react";
import arrow from "../../assets/arrow-forward.png";
const Button = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className="btn btnPrimary">
      {title}
      <img src={arrow} alt="Arrow" />
    </button>
  );
};

export default Button;
