import React, { useState } from "react";

const InputField = ({ allign, name, text, id, type, placeHolder }) => {
   const [value, setValue] = useState("");
   return (
      <div className={"input-field " + (allign ? allign : "")}>
         <label htmlFor={name}>{text}</label>
         <input placeholder={placeHolder} type={type} name={name} value={value} id={id} onChange={(e) => setValue(e.target.value)} />
      </div>
   );
};

export default InputField;
