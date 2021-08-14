import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
   Landing,
   Login,
   Signup,
   Home,
   switchDarkMode,
} from "./index.js";

const App = () => {
   switchDarkMode();
   return (
      <Router>
         <Switch>
            <Route path="/login">
               <Login />
            </Route>
            <Route path="/signup">
               <Signup />
            </Route>
            <Route path="/home">
               <Home />
            </Route>
            <Route path="/">
               <Landing />
            </Route>
         </Switch>
      </Router>
   );
};

ReactDOM.render(<App />, document.getElementById("root"));
