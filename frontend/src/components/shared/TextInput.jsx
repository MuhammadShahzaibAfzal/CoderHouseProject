import React from "react";

const TextInput = ({ placeholder, fullWidth, ...otherProps }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        {...otherProps}
        className="input bgInput txtPrimary"
        style={fullWidth === true ? { width: "100%" } : {}}
      />
    </div>
  );
};

export default TextInput;
