import React from "react";
import SideBar from '../common-components/SideBar';
import Header from '../common-components/Header';
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const ProtectedLayout = () => {

    const location = useLocation(); //location tiene info sobre la ubi actual (URL + state)
	const isAdmin = location.state?.isAdminProp || false; //usado al ejecutar junto al backend
	const isAdminTest = true; //usado solo para el desarrollo del front
	const isUserTest = false; //usado solo para el desarrollo del front 
	// si vamos a usar mas props:
	// const { isAdminProp, anotherProp } = location.state || { isAdminProp: false, anotherProp: defaultValue };


    return (
        <div className="flex min-h-screen">
          <SideBar isAdmin = {isAdminTest}></SideBar>
          <div className="flex flex-col flex-1">
            <Header isAdmin = {isAdminTest}></Header>
                <main className="p-4 flex-1">
                    <Outlet />    
                </main>
          </div>
        </div>
      );
    };

export default ProtectedLayout;