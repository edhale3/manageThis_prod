import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/"></NavLink>
          <NavLink to="/Home"></NavLink>
          <NavLink to="/about"></NavLink>
          <NavLink to="/contact"></NavLink>
          <NavLink to="/SignIn"></NavLink>
          <NavLink to="/SignUp"></NavLink>
          <NavLink to="/Account"></NavLink>
          <NavLink to="/NewProject"></NavLink>
       </div>
    );
}
 
export default Navigation;