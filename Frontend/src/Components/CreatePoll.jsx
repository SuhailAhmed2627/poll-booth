/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { InputField } from "../index";
const { token } = JSON.parse(localStorage.getItem("token")) || { undefined };

const CreatePoll = ({ teamID, teamname }) => {
   const [inputTag, setInputTag] = useState(<></>);
   const [formContents, setFormContents] = useState(
      <>Please Select a Type of Option</>
   );
   const [optionsCount, setOptionsCount] = useState(3);
   const [expiry, setExpiry] = useState(1);
   const [selectState, setSelectState] = useState("invalid");

   const changeInputTag = (event) => {
      setSelectState(event.target.value);
   };

   const createPoll = () => {
      var options = [];
      if (selectState == "text") {
         options = [...document.getElementsByClassName("options-input")];
         options = options.map((option) => {
            return {
               value: option.value,
            };
         });
      }
      const request = {
         poll: {
            pollQuestion: document.getElementById("poll-question").value,
            options: options,
            optionsType: selectState,
            teamID: teamID,
         },
         expireIn: `${expiry} ${
            document.getElementById("expire-select").options[
               document.getElementById("expire-select").selectedIndex
            ].value
         }`,
      };
      fetch("http://localhost:3000/api/poll/create", {
         method: "POST",
         headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(request),
      })
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            if (selectState != "text") {
               const files = document.getElementById("filesUpload");
               const formData = new FormData();

               for (const file in files.files) {
                  if (Object.hasOwnProperty.call(files.files, file)) {
                     const element = files.files[file];
                     formData.append("files", element);
                  }
               }

               fetch(`http://localhost:3000/upload/${data}`, {
                  method: "POST",
                  body: formData,
               })
                  .then((response) => response.json())
                  .then((data) => {
                     window.location.href = `http://localhost:1234/home/dashboard/${teamname}`;
                  });
            } else {
               window.location.href = `http://localhost:1234/home/dashboard/${teamname}`;
            }
         });
   };

   useLayoutEffect(() => {
      let inputTags = [];

      if (selectState == "image") {
         inputTags.push(
            <div key={"key"} className="create-options-container">
               <label htmlFor="option-image">Select 3 Images</label>
               <input
                  id="filesUpload"
                  type="file"
                  name="option-image"
                  accept="image"
                  multiple
               />
            </div>
         );
         setInputTag(inputTags);
      }
      if (selectState == "audio") {
         inputTags.push(
            <div key={"key"} className="create-options-container">
               <label htmlFor="option-image">Select 3 Audios</label>
               <input
                  id="filesUpload"
                  type="file"
                  name="option-image"
                  accept="audio"
                  multiple
               />
            </div>
         );
         setInputTag(inputTags);
      }

      if (selectState == "video") {
         inputTags.push(
            <div key={"key"} className="create-options-container">
               <label htmlFor="option-image">Select 3 Videos</label>
               <input
                  id="filesUpload"
                  type="file"
                  name="option-image"
                  accept="video"
                  multiple
               />
            </div>
         );
         setInputTag(inputTags);
      }

      if (selectState == "text") {
         for (let i = 0; i < optionsCount; i++) {
            inputTags.push(
               <div key={i} className="create-options-container">
                  <label htmlFor={`option-${i + 1}`}>Enter Option:</label>
                  <input
                     className="options-input"
                     name={`option-${i + 1}`}
                     key={i}
                     type="text"
                  ></input>
               </div>
            );
         }
         setInputTag(inputTags);
      }
   }, [selectState, optionsCount]);

   useEffect(() => {
      if (selectState == "text") {
         setFormContents(
            <form className="create-poll">
               {inputTag}
               <button
                  className="button small"
                  type="button"
                  onClick={function () {
                     setOptionsCount(optionsCount + 1);
                  }}
               >
                  Add Option
               </button>
            </form>
         );
      } else {
         setFormContents(<form className="create-poll">{inputTag}</form>);
      }
   }, [inputTag]);

   return (
      <>
         <InputField
            id="poll-question"
            name="add-poll"
            type="text"
            text="Create New Poll"
            placeHolder="Enter Poll's Question"
         ></InputField>
         <p>Select Type and Expiry time</p>
         <br />
         <select
            name="options-select"
            id="options-select"
            onChange={function () {
               changeInputTag(event);
            }}
            onBlur={function () {
               changeInputTag(event);
            }}
         >
            <option value="invalid" className="select-option">
               Select a Type
            </option>
            <option value="text" className="select-option">
               Text
            </option>
            <option value="image" className="select-option">
               Image
            </option>
            <option value="audio" className="select-option">
               Audio
            </option>
            <option value="video" className="select-option">
               Video
            </option>
         </select>
         <input
            type="number"
            id="expiry-value"
            value={expiry}
            onChange={(event) => setExpiry(event.target.value)}
         />
         <select name="expire-select" id="expire-select">
            <option value="days" className="select-option">
               Day
            </option>
            <option value="hours" className="select-option">
               Hour
            </option>
            <option value="minutes" className="select-option">
               Minute
            </option>
            ]
         </select>

         <div className="poll-options-form">{formContents}</div>
         <button className="button" type="button" onClick={createPoll}>
            Create New Poll
         </button>
      </>
   );
};

export default CreatePoll;
