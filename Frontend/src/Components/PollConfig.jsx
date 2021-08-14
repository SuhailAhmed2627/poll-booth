import React from "react";
import { Bar } from "react-chartjs-2";

const { token } = JSON.parse(localStorage.getItem("token")) || { undefined };

const PollConfig = ({ poll, teamname }) => {
   var xValues = [];
   var yValues = [];
   const disableButton = Date.now() >= new Date(poll.expiresAt);

   let votes = 0;
   let highest = poll.options[0];
   poll.options.forEach((option) => {
      xValues.push(option.value);
      yValues.push(option.count);
      if (option.value >= highest.value) {
         highest = option;
      }
      votes += option.count;
   });

   if (poll.optionsType != "text") {
      xValues = ["Option-A", "Option-B", "Option-C"];
   }

   if (poll.optionsType != "text") {
      var mediaOptionsList = [];

      for (let i = 0; i < poll.options.length; i++) {
         if (poll.optionsType == "image") {
            mediaOptionsList.push(
               <div key={i} className="media-list-items">
                  <div>{xValues[i]}</div>
                  <img
                     src={`http://localhost:3000/file/${poll.options[i].value}`}
                     width="400px"
                     alt="options"
                  />
               </div>
            );
         }

         if (poll.optionsType == "audio") {
            mediaOptionsList.push(
               <div key={i} className="media-list-items">
                  <div>{xValues[i]}</div>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption*/}
                  <audio
                     controls
                     src={`http://localhost:3000/file/${poll.options[i].value}`}
                     alt="options"
                  />
               </div>
            );
         }
         if (poll.optionsType == "video") {
            mediaOptionsList.push(
               <div key={i} className="media-list-items">
                  <div>{xValues[i]}</div>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption*/}
                  <video
                     controls
                     src={`http://localhost:3000/file/${poll.options[i].value}`}
                     width="500px"
                     alt="options"
                  />
               </div>
            );
         }
      }
   }

   const data = {
      labels: xValues,
      datasets: [
         {
            label: "# of Votes",
            data: yValues,
            backgroundColor: [
               "rgba(255, 99, 132, 0.2)",
               "rgba(54, 162, 235, 0.2)",
               "rgba(255, 206, 86, 0.2)",
               "rgba(75, 192, 192, 0.2)",
               "rgba(153, 102, 255, 0.2)",
               "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
               "rgba(255, 99, 132, 1)",
               "rgba(54, 162, 235, 1)",
               "rgba(255, 206, 86, 1)",
               "rgba(75, 192, 192, 1)",
               "rgba(153, 102, 255, 1)",
               "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
         },
      ],
   };

   const options = {
      scales: {
         yAxes: [
            {
               ticks: {
                  beginAtZero: true,
               },
            },
         ],
      },
   };

   const endPoll = (poll) => {
      fetch("http://localhost:3000/api/poll/end", {
         method: "POST",
         headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ pollID: poll._id }),
      })
         .then((response) => {
            return response.json();
         })
         // eslint-disable-next-line no-unused-vars
         .then((data) => {
            window.location.href = `http://localhost:1234/home`;
         });
   };

   return (
      <details>
         <summary>{poll.pollQuestion}</summary>
         {Date.now() >= new Date(poll.expiresAt) ? (
            <p>Poll Ended, {highest.value} got the highest votes</p>
         ) : (
            <p>Total No. of Votes: {votes}</p>
         )}
         {mediaOptionsList && (
            <div className="media-list">{mediaOptionsList}</div>
         )}

         <div className="bar">
            <Bar data={data} options={options}></Bar>
         </div>
         <br />
         <button
            disabled={disableButton}
            className="button small"
            onClick={function () {
               endPoll(poll);
            }}
         >
            End Poll
         </button>
      </details>
   );
};

export default PollConfig;
