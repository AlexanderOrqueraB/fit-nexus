import React from "react"; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import CreateExercise, { WorkoutBuilder } from './components/users/trainer/WorkoutBuilder';

import LoginForm from './components/users/user-actions/LoginForm';
import LogoutForm from './components/users/user-actions/LogoutForm';
import SignUpForm from './components/users/user-actions/SignUpForm';

import HomePage from "./components/main-components/HomePage";
import ClientsList from "./components/users/trainer/ClientsList";
import ExercisesList, { Workout } from "./components/users/client/Workout";
import UnauthorizedPage from "./components/main-components/UnauthorizedPage";
import ProtectedLayout from "./components/main-components/ProtectedLayout";
import Settings from "./components/users/user-actions/Settings";
import NutritionChart from "./components/nutrition/NutritionChart";
import { Toaster } from "sonner";


function App () {
    const role = 'admin'; // TODO: or 'client', replace with role logic
    const userEmail = 'user@example.com'; // TODO: replace with user email logic
return (
    /*<UserProvider>*/
        <BrowserRouter>
        <Toaster richColors expand={true} position="top-right"/>
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
                        </div>
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
                            <Workout role={role} userEmail={userEmail}/>
                    /*</ProtectedRoute>*/
                    }/>
                    
                    <Route path="/clients" element={
                        /*<ProtectedRoute roleRequired="ADMIN">*/
                            <ClientsList />
                        /*</ProtectedRoute>*/
                    }/>
                    
                    <Route path="/nutri" element={
                        /*<ProtectedRoute>*/
                        <NutritionChart role={role} userEmail={userEmail} />
                        /*</ProtectedRoute>*/
                    }/>

                </Route>
            </Routes>
        </BrowserRouter>
    /*</UserProvider>*/
)

}
export default App;
