import React from "react";

const { token } = JSON.parse(localStorage.getItem("token")) || { undefined };

const Poll = ({ user, poll, teamname }) => {
   const helperText = user.pollsID.includes(poll._id)
      ? "You already Submited"
      : "Select an Option:";
   const disableButton = user.pollsID.includes(poll._id);

   var options;

   switch (poll.optionsType) {
      case "image":
         options = poll.options.map((option) => {
            return (
               <label className="rad-label" key={option.value}>
                  <input
                     type="radio"
                     className="rad-input"
                     name="poll-option"
                     value={option.value}
                  />
                  <div className="rad-design"></div>
                  <div className="rad-text">
                     <img
                        src={`http://localhost:3000/file/${option.value}`}
                        width="400px"
                        alt="options"
                     />
                  </div>
               </label>
            );
         });
         break;

      case "audio":
         options = poll.options.map((option) => {
            return (
               <label className="rad-label" key={option.value}>
                  <input
                     type="radio"
                     className="rad-input"
                     name="poll-option"
                     value={option.value}
                  />
                  <div className="rad-design"></div>
                  <div className="rad-text">
                     <figure>
                        {/*eslint-disable-next-line jsx-a11y/media-has-caption*/}
                        <audio
                           controls
                           src={`http://localhost:3000/file/${option.value}`}
                           alt="options"
                        />
                     </figure>
                  </div>
               </label>
            );
         });
         break;

      case "video":
         options = poll.options.map((option) => {
            return (
               <label className="rad-label" key={option.value}>
                  <input
                     type="radio"
                     className="rad-input"
                     name="poll-option"
                     value={option.value}
                  />
                  <div className="rad-design"></div>
                  <div className="rad-text">
                     {/*eslint-disable-next-line jsx-a11y/media-has-caption*/}
                     <video
                        controls
                        src={`http://localhost:3000/file/${option.value}`}
                        width="500px"
                        alt="options"
                     />
                  </div>
               </label>
            );
         });
         break;

      default:
         options = poll.options.map((option) => {
            return (
               <label className="rad-label" key={option.value}>
                  <input
                     type="radio"
                     className="rad-input"
                     name="poll-option"
                     value={option.value}
                  />
                  <div className="rad-design"></div>
                  <div className="rad-text">
                     <p>{option.value}</p>
                  </div>
               </label>
            );
         });
         break;
   }

   const submitPoll = async () => {
      const selectedOption = Array.from(
         document.getElementsByName("poll-option")
      ).filter((radio) => radio.checked)[0].value;
      const request = {
         selectedOption: selectedOption,
         pollID: poll._id,
      };
      fetch("http://localhost:3000/api/poll/submit", {
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
            window.location.href = `http://localhost:1234/home/${teamname}/pollsmenu`;
         });
   };
   return (
      <div className="poll-container">
         <h3>{poll.pollQuestion}</h3>
         <div className="helpertext">{helperText}</div>
         <br />
         {options}
         <br />
         <button
            disabled={disableButton}
            onClick={submitPoll}
            className="button small"
            type="button"
         >
            Submit
         </button>
      </div>
   );
};

export default Poll;
