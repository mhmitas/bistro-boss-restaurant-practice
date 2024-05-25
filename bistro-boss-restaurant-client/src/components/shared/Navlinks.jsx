import { NavLink } from "react-router-dom";

export const navItems = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to={"/menu"}>Menu</NavLink></li>
    <li><NavLink to="/order?category">Order Food</NavLink></li>
</>