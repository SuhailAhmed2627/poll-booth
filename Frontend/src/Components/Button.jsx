import React from "react";

const Button = ({ size, children, disabled }) => {
   return (
      <button disabled={disabled} className={size == "large" ? "button-large" : "button"}>
         {children}
      </button>
   );
};

export default Button;
