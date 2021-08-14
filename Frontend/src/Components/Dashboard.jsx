import React from "react";
import { InputField, TeamConfig } from "../index.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const { token } = JSON.parse(localStorage.getItem("token")) || { undefined };
const Dashboard = ({ user, teams }) => {
   const teamConfigRoutes = teams.map((team) => {
      if (team.createdBy === user._id) {
         return (
            <Route key={team._id} path={`/home/dashboard/${team.teamname}`}>
               <TeamConfig team={team}></TeamConfig>
            </Route>
         );
      }
   });

   if (user.notifications.length != 0) {
      var notifications = user.notifications.map((notification) => {
         return <p key={notification}>{notification}</p>;
      });
   }

   const teamConfigLink = teams.map((team) => {
      if (team.createdBy === user._id) {
         return (
            <Link key={team._id} to={`/home/dashboard/${team.teamname}`}>
               {team.teamname}
            </Link>
         );
      }
   });

   const createTeam = () => {
      const request = {
         teamname: document.getElementById("create-team").value,
      };

      fetch("http://localhost:3000/api/team/create", {
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

   return (
      <div className="dashboard">
         <div className="team-nav">
            <div className="team-title">
               <h2>Dashboard</h2>
            </div>
         </div>
         <div className="inner-container">
            <Router>
               <Switch>
                  <Route path="/home/dashboard/menu">
                     <>
                        <div className="notifications">
                           <h2>Your Notifications:</h2>
                           {notifications}
                        </div>
                        <hr />
                        <div className="create-team">
                           <InputField
                              name="create-team"
                              id="create-team"
                              type="text"
                              text="Create New Team"
                              placeHolder="Enter Team's name"
                           ></InputField>
                           <button
                              className="button small"
                              type="button"
                              onClick={createTeam}
                           >
                              Create Team
                           </button>
                        </div>
                        <br />
                        {teamConfigLink.length >= 1 && teamConfigLink[0] ? (
                           <>
                              <h2>Your Teams:</h2>
                              {teamConfigLink}
                           </>
                        ) : (
                           <h2>You are not Admin of any team</h2>
                        )}
                     </>
                  </Route>
                  {teamConfigRoutes}
               </Switch>
            </Router>
         </div>
      </div>
   );
};

export default Dashboard;
