import React, { useEffect, useState } from "react";
import useWindowSize from "../Utils/useWindowSize.js";
import { InputField, HelperText } from "../index.js";
import checkPwdStength from "../Utils/checkPwdStrength.js";

const signup = () => {
   let details = document.getElementById("signup-form");
   if (details.elements["password"].value == details.elements["re-password"].value) {
      let user = {
         username: details.elements["username"].value,
         password: details.elements["password"].value,
      };
      fetch("http://localhost:3000/api/user/signup", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((response) => response.json())
         .then(() => {
            window.location.href = "http://localhost:1234/login";
         })
         .catch((error) => {
            console.error("Error:", error);
         });
   } else {
      document.getElementsByClassName("helpertext")[0].textContent = "Passwords Does not match";
   }
};

const Signup = () => {
   const [value, setValue] = useState("");
   const [buttonDisabled, setbuttonDisabled] = useState(true);
   const [helperText, setHelperText] = useState({ content: "Password is Invalid", color: "red" });
   const { width } = useWindowSize();
   document.getElementById("root").style.backgroundColor = width <= 480 ? "#141414" : "#000000";

   useEffect(() => {
      document.querySelector(`link[href='${document.styleSheets[1].href}']`).href = "http://localhost:3000/CSS/login-signup.css";
   }, []);

   useEffect(() => {
      setHelperText(checkPwdStength(value));
      if (helperText.content != "Password is Invalid") {
         setbuttonDisabled(false);
      }
   }, [value]);
   return (
      <>
         {width > 480 && (
            <div className="signup-modal">
               <form id="signup-form">
                  <h1>Sign Up</h1>
                  <InputField name="username" type="text" text="Enter Username"></InputField>
                  <div className="input-field">
                     <label htmlFor="password">Enter password</label>
                     <input type="password" name="password" value={value} id="password" onChange={(e) => setValue(e.target.value)} />
                  </div>
                  <InputField name="re-password" type="password" text="Re Enter Password"></InputField>
                  <HelperText color={helperText.color}>{helperText.content}</HelperText>
                  <button
                     type="button"
                     disabled={buttonDisabled}
                     onClick={function () {
                        signup();
                     }}
                     className="button"
                  >
                     <p>Sign Up</p>
                  </button>
               </form>
            </div>
         )}
         {width <= 480 && (
            <>
               <form id="signup-form">
                  <h1>Sign Up</h1>
                  <InputField name="username" type="text" text="Enter Username"></InputField>
                  <div className="input-field">
                     <label htmlFor="password">Enter password</label>
                     <input type="password" name="password" value={value} id="password" onChange={(e) => setValue(e.target.value)} />
                  </div>
                  <InputField name="re-password" type="password" text="Re Enter Password"></InputField>
                  <HelperText color={helperText.color}>{helperText.content}</HelperText>
                  <button
                     type="button"
                     disabled={buttonDisabled}
                     onClick={function () {
                        signup();
                     }}
                     className="button"
                  >
                     <p>Sign Up</p>
                  </button>
               </form>
            </>
         )}
      </>
   );
};

export default Signup;
