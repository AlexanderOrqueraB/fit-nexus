import React, { useContext } from "react";
import SideBar from '../navbars/SideBar';
import Header from '../navbars/Header';
import { Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";

const ProtectedLayout = () => {

  const { user } = useContext(UserContext);
  console.log("Usuario en ProtectedLayout: ", user);
  console.log("Rol del usuario en ProtectedLayout: ", user.role);
  //const isAdmin = user.role === 'admin';
  const isAdmin = true;

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