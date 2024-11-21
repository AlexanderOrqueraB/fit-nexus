import React, { useState, useEffect } from "react"; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import EditProfile from './components/main-components/EditProfile';
import CreateExercise from './components/main-components/CreateExercise';

import CustomForm from './components/to-double-check/CustomForm';

import LoginForm from './components/main-components/LoginForm';
import LogoutForm from './components/main-components/LogoutForm';
import SignUpForm from './components/main-components/SignUpForm';

import HomePage from "./components/main-components/HomePage";
import ClientsList from "./components/main-components/ClientsList";
import ExercisesList from "./components/main-components/ExercisesList";
import NutritionList from "./components/main-components/NutritionList";


function App () {
    const [data, setData] = useState([]); //useState to store data from server
    const [userRole, setUserRole] = useState(null); // Almacenará el rol del usuario

    useEffect(() => {
        // Obtener el rol del usuario del localStorage al cargar el componente
        localStorage.removeItem("userRole");
        const role = localStorage.getItem("userRole");
        console.log("Rol al cargar el componente:", role);
        setUserRole(role);

        const handleStorageChange = () => {
            const newRole = localStorage.getItem("userRole");
            setUserRole(newRole);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
//    const fetchData = () => {
//        axios.get(baseURL)
//            .then(response => {
//                setData(response.data);
//            })
//            .catch(error => {
//                console.log(error);
//            });
//    }
//
//    useEffect( () => {
//        fetchData();
//    }, []) //empty array ensures that the effect only runs once

return (

    <BrowserRouter>
        <br></br>
        <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/logout" element={<LogoutForm/>}/>
            <Route path="/signup" element={<SignUpForm/>}/>
            <Route path="/edit-profile" element={<EditProfile />}/>
            <Route path="/create-exercise" element={<CreateExercise />}/>
            <Route path="/ejercicios" element={<ExercisesList />}/>
            <Route path="/clients" element={<ClientsList />}/>
            <Route path="/nutri" element={<NutritionList />}/>

            <Route path="/form" element={<CustomForm />}/>
            
            <Route path="/dashboard" element={<HomePage />}/>

        </Routes>
    </BrowserRouter>
)

}
export default App;
