import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/"></NavLink>
          <NavLink to="/home"></NavLink>
          <NavLink to="/about"></NavLink>
          <NavLink to="/contact"></NavLink>
          <NavLink to="/signIn"></NavLink>
          <NavLink to="/signUp"></NavLink>
          <NavLink to="/account"></NavLink>
          <NavLink to="/newproject"></NavLink>
       </div>
    );
}
 
export default Navigation;