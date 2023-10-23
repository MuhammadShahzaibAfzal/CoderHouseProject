import React from "react";

const TextInput = ({ placeholder, ...otherProps }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        {...otherProps}
        className="input bgInput txtPrimary"
      />
    </div>
  );
};

export default TextInput;
