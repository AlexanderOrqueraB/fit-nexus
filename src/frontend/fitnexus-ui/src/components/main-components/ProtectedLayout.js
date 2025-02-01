import React, { useContext } from "react";
import SideBar from '../navbars/SideBar';
import Header from '../navbars/Header';
import { Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";

const ProtectedLayout = ({ role }) => {

  const isAdmin = role === 'admin';

  return (
      <div className="flex min-h-screen">
        <SideBar isAdmin = {isAdmin}></SideBar>
        <div className="flex flex-col flex-1">
          <Header isAdmin = {isAdmin}></Header>
              <main className="p-4 flex-1">
                  <Outlet />    
              </main>
        </div>
      </div>
    );
  };

export default ProtectedLayout;