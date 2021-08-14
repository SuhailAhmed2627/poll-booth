import React, { useEffect, useState } from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   NavLink,
} from "react-router-dom";
import { Chat, VideoCall, PollsMenu } from "../index.js";

const { token } = JSON.parse(localStorage.getItem("token")) || { undefined };

const Team = ({ team, user }) => {
   const [polls, setPolls] = useState([]);

   useEffect(() => {
      if (team.pollsID && team.pollsID.length != 0) {
         const request = {
            teamID: team._id,
         };
         fetch("http://localhost:3000/api/poll/get", {
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
            .then((data) => setPolls(data));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="team">
         <Router>
            <div className="team-nav">
               <NavLink
                  activeClassName="team-nav-selected"
                  to={`/home/${team.teamname}/videocall`}
               >
                  Video Call
               </NavLink>
               <NavLink
                  activeClassName="team-nav-selected"
                  to={`/home/${team.teamname}/chat`}
               >
                  Chats
               </NavLink>
               <NavLink
                  activeClassName="team-nav-selected"
                  to={`/home/${team.teamname}/pollsmenu`}
               >
                  Polls
               </NavLink>
               <div className="team-title">
                  <h2>{team.teamname}</h2>
               </div>
            </div>
            <Switch>
               <Route path={`/home/${team.teamname}/pollsmenu`}>
                  <PollsMenu
                     polls={polls}
                     user={user}
                     teamname={team.teamname}
                  ></PollsMenu>
               </Route>
               <Route path={`/home/${team.teamname}/chat`}>
                  <Chat></Chat>
               </Route>
               <Route path={`/home/${team.teamname}/videocall`}>
                  <VideoCall></VideoCall>
               </Route>
            </Switch>
         </Router>
      </div>
   );
};

export default Team;
