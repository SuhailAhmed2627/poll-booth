import React from "react";

const HelperText = (props) => {
   return (
      <div className="helpertext" style={{ color: props.color }}>
         {props.children}
      </div>
   );
};

export default HelperText;
