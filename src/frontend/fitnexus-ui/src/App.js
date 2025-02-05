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
    const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
    const userRole = user?.role;
    const userEmail = user?.email;
    
    console.log("User Role en App.js: ", userRole);
    console.log("User Email en App.js: ", userEmail);

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
                <Route element = {<ProtectedLayout role={userRole}  />}>
                    <Route path="/dashboard" element={
                        /*<ProtectedRoute>*/
                        <Suspense fallback={<div>Cargando...</div>}>
                                <HomePage role={userRole} userEmail={userEmail}/>
                        </Suspense>
                        /*</ProtectedRoute>*/
                    }/>
                    <Route path="/settings" element={
                        /*<ProtectedRoute>*/
                            <Settings role={userRole} userEmail={userEmail} />
                        /*</ProtectedRoute>*/
                    }/>

                    <Route path="/workout-builder" element={
                        /*<ProtectedRoute roleRequired="ADMIN">*/
                            <WorkoutBuilder />
                        /*</ProtectedRoute>*/
                    }/>
                
                    <Route path="/ejercicios" element={
                        /*<ProtectedRoute>*/
                            <Workout role={userRole} userEmail={userEmail}/>
                        /*</ProtectedRoute>*/
                    }/>
                    
                    <Route path="/clients" element={
                        /*<ProtectedRoute roleRequired="ADMIN">*/
                            <ClientsList role={userRole} entrenadorEmail={userEmail}/>
                        /*</ProtectedRoute>*/
                    }/>
                    
                    <Route path="/nutri" element={
                        /*<ProtectedRoute>*/
                            <NutritionChart role={userRole} userEmail={userEmail} />
                        /*</ProtectedRoute>*/
                    }/>

                </Route>
            </Routes>
        </BrowserRouter>
)

}
export default App;
