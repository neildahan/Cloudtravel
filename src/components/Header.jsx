import React, { useEffect, useState } from "react";
import "./vacation.css";
import logo1 from "../logo3.png";
import { Button, TextField } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import { useHistory, NavLink } from "react-router-dom";
import VacationCard from "./VacationCard";
import { MDCDialog } from "@material/dialog";
import NewVacation from "./NewVacation";
import Reports from "./Reports";
import reportWebVitals from "../reportWebVitals";

export default function Header({setVacationsArr}) {

    const userRole = localStorage.role;
    const history = useHistory();
    const logout = async () => {
        const res = await fetch("http://localhost:1000/user/logout", {
          method: "delete",
          credentials: "include",
        });
        const data = await res.json();
        if (data.msg) {
          localStorage.removeItem("role");
          localStorage.removeItem("username");
          history.push("/login");
        }
      };

    return (
        <div className="header">
        <img className="logo-header" src={logo1} alt="no" />
        <div className="addBtn">
         
        {/* <Button size="large" color="primary" variant="contained" className='prim-button report-button' >
      Reports
    </Button> */}
      
        {userRole === "admin" && (
          <div className="admin-menu"> 
          <NavLink className="link" to="/home">Home</NavLink>
          <NavLink className="link" to="/reports">Reports</NavLink>
          <NewVacation  setVacationsArr={setVacationsArr} /></div>
          )}</div>
       <div className="logout">
        <IconButton  aria-label="delete">
          <LogoutIcon onClick={logout}></LogoutIcon>
        </IconButton>
      </div></div>
    )
}

