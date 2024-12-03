import React, { useState, useEffect } from "react"; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { UserProvider } from "./components/main-components/UserContext";
import ProtectedRoute from "./components/main-components/ProtectedRoute";
import CreateExercise from './components/main-components/CreateExercise';

import LoginForm from './components/main-components/LoginForm';
import LogoutForm from './components/main-components/LogoutForm';
import SignUpForm from './components/main-components/SignUpForm';

import HomePage from "./components/main-components/HomePage";
import ClientsList from "./components/main-components/ClientsList";
import ExercisesList from "./components/main-components/ExercisesList";
import NutritionList from "./components/main-components/NutritionList";
import UnauthorizedPage from "./components/main-components/UnauthorizedPage";
import ProtectedLayout from "./components/main-components/ProtectedLayout";
import Settings from "./components/main-components/Settings";
import Settings2 from "./components/main-components/Settings";
import ProgressCustom from "./components/to-double-check/Progress";
import Test2 from "./components/to-double-check/Test2";


function App () {

return (
    /*<UserProvider>*/
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<LoginForm/>}/>
                <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
                <Route path="/logout" element={<LogoutForm/>}/>
                <Route path="/signup" element={<SignUpForm/>}/>

                {/* Rutas protegidas comunes */}
                <Route element = {<ProtectedLayout />}>
                    
                    <Route path="/dashboard" element={
                        /*<ProtectedRoute>*/
                        <div>
                            <HomePage />
                            <ProgressCustom />
                        </div>
                        /*</ProtectedRoute>*/
                    }/>
                    <Route path="/settings" element={
                        /*<ProtectedRoute>*/
                            <Settings />
                        /*</ProtectedRoute>*/
                    }/>

                    <Route path="/create-exercise" element={
                        /*<ProtectedRoute roleRequired="ADMIN">*/
                            <CreateExercise />
                        /*</ProtectedRoute>*/
                    }/>
                
                    <Route path="/ejercicios" element={
                    /*<ProtectedRoute>*/
                            <ExercisesList />
                    /*</ProtectedRoute>*/
                    }/>
                    
                    <Route path="/clients" element={
                        /*<ProtectedRoute roleRequired="ADMIN">*/
                            <ClientsList />
                        /*</ProtectedRoute>*/
                    }/>
                    
                    <Route path="/nutri" element={
                        /*<ProtectedRoute>*/
                            <NutritionList />
                        /*</ProtectedRoute>*/
                    }/>

                    {/*Elementos sideBar de prueba test1 y test2*/}
                    <Route path="/test1" element={
                        /*<ProtectedRoute>*/
                            <Test2 />
                        /*</ProtectedRoute>*/
                    }/>
                    <Route path="/test2" element={
                        /*<ProtectedRoute>*/
                            <Test2 />
                        /*</ProtectedRoute>*/
                    }/>
                </Route>
            </Routes>
        </BrowserRouter>
    /*</UserProvider>*/
)

}
export default App;
