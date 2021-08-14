import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../index.js";

const Landing = () => {
   return (
      <>
         <img src="http://localhost:3000/Assets/deltaLogoGreen.png" width="400px" alt="Delta Force's Logo" />
         <Link to="/login">
            <Button size="large">
               <h2>Login</h2>
            </Button>
         </Link>
         <p>
            Click <Link to="/signup">Here</Link> to sign up
         </p>
      </>
   );
};

export default Landing;
