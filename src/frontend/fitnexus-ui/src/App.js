import React, { lazy, Suspense, useContext } from "react"; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { WorkoutBuilder } from './components/users/trainer/WorkoutBuilder';

import LoginForm from './components/users/user-actions/LoginForm';
import LogoutForm from './components/users/user-actions/LogoutForm';
import SignUpForm from './components/users/user-actions/SignUpForm';

import ClientsList from "./components/users/trainer/ClientsList";
import { Workout } from "./components/users/client/Workout";
import UnauthorizedPage from "./components/main-components/UnauthorizedPage";
import ProtectedLayout from "./components/main-components/ProtectedLayout";
import Settings from "./components/users/user-actions/Settings";
import NutritionChart from "./components/nutrition/NutritionChart";
import { Toaster } from "sonner";
import { UserContext } from "./components/main-components/UserContext";
const HomePage = lazy (() =>import ("./components/main-components/HomePage"));



function App () {

return (
    <BrowserRouter>
        <Toaster richColors expand={true} position="top-right"/>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<LoginForm/>}/>
                <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
                <Route path="/logout" element={<LogoutForm/>}/>
                <Route path="/signup" element={<SignUpForm/>}/>

                {/* Rutas privadas */}
                <Route element = {<ProtectedLayout />}>
                    <Route path="/dashboard" element={
                        /*<ProtectedRoute>*/
                        <Suspense fallback={<div>Cargando...</div>}>
                                <HomePage />
                        </Suspense>
                        /*</ProtectedRoute>*/
                    }/>
                    <Route path="/settings" element={
                        /*<ProtectedRoute>*/
                            <Settings />
                        /*</ProtectedRoute>*/
                    }/>

                    <Route path="/workout-builder" element={
                        /*<ProtectedRoute roleRequired="ADMIN">*/
                            <WorkoutBuilder />
                        /*</ProtectedRoute>*/
                    }/>
                
                    <Route path="/ejercicios" element={
                        /*<ProtectedRoute>*/
                            <Workout />
                        /*</ProtectedRoute>*/
                    }/>
                    
                    <Route path="/clients" element={
                        /*<ProtectedRoute roleRequired="ADMIN">*/
                            <ClientsList />
                        /*</ProtectedRoute>*/
                    }/>
                    
                    <Route path="/nutri" element={
                        /*<ProtectedRoute>*/
                            <NutritionChart />
                        /*</ProtectedRoute>*/
                    }/>

                </Route>
            </Routes>
        </BrowserRouter>
)

}
export default App;
