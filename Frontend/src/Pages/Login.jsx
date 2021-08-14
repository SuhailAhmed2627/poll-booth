import React, { useEffect } from "react";
import useWindowSize from "../Utils/useWindowSize.js";
import { InputField, HelperText } from "../index.js";
// import { response } from "express";

const login = () => {
   let details = document.getElementById("login-form");
   let user = {
      username: details.elements["username"].value,
      password: details.elements["password"].value,
   };
   fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => {
         if (response.status === 201) {
            response
               .json()
               .then((data) =>
                  localStorage.setItem("token", JSON.stringify(data))
               );
            window.location.href = "http://localhost:1234/home";
         } else {
            response.json().then((data) => {
               document.getElementsByClassName("helpertext")[0].textContent =
                  data.message;
            });
            return;
         }
      })
      .catch((error) => {
         console.error("Error:", error);
      });
};

const Login = () => {
   const { width } = useWindowSize();
   document.getElementById("root").style.backgroundColor =
      width <= 480 ? "#141414" : "#000000";

   useEffect(() => {
      document.querySelector(
         `link[href='${document.styleSheets[1].href}']`
      ).href = "http://localhost:3000/CSS/login-signup.css";
   }, []);

   return (
      <>
         {width > 480 && (
            <div className="login-modal">
               <form id="login-form">
                  <h1>Login</h1>
                  <InputField
                     name="username"
                     type="text"
                     text="Enter Username"
                  ></InputField>
                  <div className="input-field">
                     <label htmlFor="password">Enter password</label>
                     <input type="password" name="password" id="password" />
                  </div>
                  <HelperText id="message"></HelperText>
                  <button
                     type="button"
                     className="button"
                     onClick={function () {
                        login();
                     }}
                  >
                     <p>Login</p>
                  </button>
               </form>
            </div>
         )}
         {width <= 480 && (
            <>
               <form id="login-form">
                  <h1>Login</h1>
                  <InputField
                     name="username"
                     type="text"
                     text="Enter Username"
                  ></InputField>
                  <div className="input-field">
                     <label htmlFor="password">Enter password</label>
                     <input type="password" name="password" id="password" />
                  </div>
                  <HelperText id="message"></HelperText>
                  <button
                     type="button"
                     className="button"
                     onClick={function () {
                        login();
                     }}
                  >
                     <p>Login</p>
                  </button>
               </form>
            </>
         )}
      </>
   );
};

export default Login;
