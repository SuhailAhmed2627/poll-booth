import React from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Poll } from "../index.js";

const Polls = ({ polls, user, teamname }) => {
   const pollList = polls.map((poll) => {
      const details = {
         pollAnswered: "fail",
         question: poll.pollQuestion,
      };
      if (poll.usersID.includes(user._id)) {
         details.pollAnswered = "success";
      }
      return (
         <Link to={`/home/${teamname}/pollsmenu/${poll._id}`} key={poll._id}>
            <div className={`flag ${details.pollAnswered}`}></div>
            <div className="poll-question-container">
               <h4>{details.question}</h4>
            </div>
         </Link>
      );
   });
   const routes = polls.map((poll) => {
      return (
         <Route path={`/home/${teamname}/pollsmenu/${poll._id}`} key={poll._id}>
            <Poll user={user} poll={poll} teamname={teamname}></Poll>
         </Route>
      );
   });
   return (
      <Router>
         <Switch>
            <Route exact path={`/home/${teamname}/pollsmenu`}>
               <div className="polls-menu">{pollList}</div>
            </Route>
            {routes}
         </Switch>
      </Router>
   );
};

export default Polls;
