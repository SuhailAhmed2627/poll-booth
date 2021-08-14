import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = ({ teams }) => {
   const menuItems = teams.map((team) => {
      return (
         <NavLink
            activeStyle={{
               fontWeight: "bold",
               backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
            key={team.teamname}
            to={`/home/${team.teamname}/pollsmenu`}
         >
            {team.teamname}
         </NavLink>
      );
   });
   return (
      <div className="nav-side-bar">
         <div className="logo">
            <img
               src="http://localhost:3000/Assets/deltaLogoGreen.png"
               width="200px"
               alt="Delta Force's Logo"
            />
         </div>
         <div className="menu">
            <NavLink
               activeStyle={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
               }}
               to="/home/dashboard/menu"
            >
               Dashboard
            </NavLink>
            {menuItems}
         </div>
      </div>
   );
};

export default SideBar;
