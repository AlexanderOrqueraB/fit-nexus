import React, { lazy, Suspense } from "react"; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { WorkoutBuilder } from './pages/WorkoutBuilder';

import LoginForm from './pages/LoginForm';
import LogoutForm from './pages/LogoutForm';
import SignUpForm from './pages/SignUpForm';

import ClientsList from "./pages/ClientsList";
import { Workout } from "./pages/Workout";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ProtectedLayout from "./components/global/ProtectedLayout";
import Settings from "./pages/Settings";
import NutritionChart from "./pages/NutritionChart";
import { Toaster } from "sonner";
const HomePage = lazy (() =>import ("./pages/HomePage"));



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
