import React, { useEffect, useState } from "react";
import { InputField, PollConfig, CreatePoll } from "../index";
const { token } = JSON.parse(localStorage.getItem("token")) || { undefined };
const TeamConfig = ({ team }) => {
   const [users, setUsers] = useState([]);
   const [polls, setPolls] = useState([]);

   const addUser = () => {
      const request = {
         teamID: team._id,
         username: document.getElementById("add-user-username").value,
      };

      fetch("http://localhost:3000/api/team/adduser", {
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
            window.alert(data.message);
         });
   };

   useEffect(() => {
      if (team.usersID && team.usersID.length != 0) {
         fetch("http://localhost:3000/api/team/getusers", {
            method: "POST",
            headers: {
               authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ usersID: team.usersID.splice(1) }),
         })
            .then((response) => {
               return response.json();
            })
            .then((data) => {
               setUsers(data);
            });
      }
      if (team.pollsID && team.pollsID.length != 0) {
         fetch("http://localhost:3000/api/team/getpolls", {
            method: "POST",
            headers: {
               authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ pollsID: team.pollsID }),
         })
            .then((response) => {
               return response.json();
            })
            .then((data) => {
               setPolls(data);
            });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div>
         <br />
         <h3>{team.teamname}</h3>
         <h5>ID to Join team:</h5>
         <span>{team._id}</span>
         <InputField
            id="add-user-username"
            name="add-user"
            type="text"
            text="Add User"
            placeHolder="Enter User's name"
         ></InputField>
         <button className="button small" type="button" onClick={addUser}>
            Add User
         </button>
         <br />
         <br />
         <CreatePoll teamname={team.teamname} teamID={team._id}></CreatePoll>
         <br />
         <br />
         <h4>Users:</h4>
         {users.map((userDetails) => {
            return (
               <div key={userDetails._id} className="dashboard-details">
                  <span>{userDetails.username}</span>
                  <span>{userDetails.role}</span>
               </div>
            );
         })}
         <br />
         <br />
         <h4>Polls:</h4>
         {polls.map((poll) => {
            return (
               <div key={poll._id}>
                  <PollConfig poll={poll} teamname={team.teamname}></PollConfig>
               </div>
            );
         })}
      </div>
   );
};

export default TeamConfig;
