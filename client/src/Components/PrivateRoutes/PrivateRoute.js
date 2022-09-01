import React from "react";
import {Route, Navigate} from "react-router-dom";
import { Outlet } from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import { Login } from "../Login/Login";

// create a wrapper for our current route
export default function PrivateRoute (){
    const {currentUser} = useAuth();

    
        
    return currentUser? <Outlet/>: <Login/>;
  }