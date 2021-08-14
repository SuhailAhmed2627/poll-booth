import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import useWindowSize from "../Utils/useWindowSize.js";
import { SideBar, Team, Dashboard, InputField } from "../index.js";
const { token } = JSON.parse(localStorage.getItem("token")) || { undefined };
const Home = () => {
   const [user, setUser] = useState({});
   const [teams, setTeams] = useState([]);
   const [routes, setRoutes] = useState(<></>);

   const joinTeam = () => {
      fetch("http://localhost:3000/api/team/join", {
         method: "POST",
         headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            teamID: document.getElementById("join-team").value,
         }),
      })
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            if (data.message == "Invalid Team ID") {
               window.alert(data.message);
            } else {
               window.location.href = "http://localhost:1234/home";
            }
         });
   };

   useEffect(() => {
      document.querySelector(
         `link[href='${document.styleSheets[1].href}']`
      ).href = "http://localhost:3000/CSS/home.css";
      document.querySelector(
         `link[href='http://localhost:3000/CSS/dark-theme.css']`
      ).href = "http://localhost:3000/CSS/home-dark.css";
      if (token) {
         fetch("http://localhost:3000/api/user/get", {
            method: "POST",
            headers: {
               authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
         })
            .then((response) => {
               return response.json();
            })
            .then((data) => setUser(data));
      } else {
         window.location.href = "http://localhost:1234/landing";
      }
   }, []);

   useEffect(() => {
      if (user.teamsID && user.teamsID.length != 0) {
         fetch("http://localhost:3000/api/team/get", {
            method: "GET",
            headers: {
               authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
            },
         })
            .then((response) => {
               return response.json();
            })
            .then((data) => {
               setTeams(data);
            });
      }
   }, [user]);

   useEffect(() => {
      setRoutes(
         teams.map((team) => {
            return (
               <Route
                  path={`/home/${team["teamname"]}/pollsmenu`}
                  key={team["teamname"]}
               >
                  <Team team={team} user={user}></Team>
               </Route>
            );
         })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [teams]);

   return (
      <>
         <Router>
            <SideBar teams={teams}></SideBar>
            <div className="outer-container">
               <div className="heading">
                  <h1>{`Hello there, ${user.username}`}</h1>
               </div>
               <Switch>
                  <Route exact path={"/home"}>
                     <div>
                        <InputField
                           name="join-team"
                           id="join-team"
                           type="text"
                           text="Join Team"
                           placeHolder="Enter Team's ID"
                        ></InputField>
                     </div>
                     <button className="button small" onClick={joinTeam}>
                        Join
                     </button>
                  </Route>
                  {routes}
                  <Route path={`/home/dashboard`}>
                     <Dashboard user={user} teams={teams}></Dashboard>
                  </Route>
               </Switch>
            </div>
         </Router>
      </>
   );
};

export default Home;
