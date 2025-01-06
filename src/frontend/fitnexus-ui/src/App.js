import React from "react"; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import CreateExercise, { WorkoutBuilder } from './components/main-components/WorkoutBuilder';

import LoginForm from './components/main-components/LoginForm';
import LogoutForm from './components/main-components/LogoutForm';
import SignUpForm from './components/main-components/SignUpForm';

import HomePage from "./components/main-components/HomePage";
import ClientsList from "./components/main-components/ClientsList";
import ExercisesList, { Workout } from "./components/main-components/Workout";
import UnauthorizedPage from "./components/main-components/UnauthorizedPage";
import ProtectedLayout from "./components/main-components/ProtectedLayout";
import Settings from "./components/main-components/Settings";
import NutritionChart from "./components/to-double-check/NutritionChart";
import { Toaster } from "sonner";


function App () {

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
    /*</UserProvider>*/
)

}
export default App;
