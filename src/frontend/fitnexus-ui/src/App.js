import axios from "axios"; //(1)
import React, { useRef, useState, useEffect } from "react"; //(2)
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {Link, useNavigate} from 'react-router-dom'

import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./components_ui/ui/alert"

import { Button } from "./components_ui/ui/button"


import EditProfile from './components/EditProfile';
import CreateExercise from './components/CreateExercise';

import ExerciseComponent from './components/ExerciseComponent';

import CustomForm from './components/CustomForm';

import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import SignUpForm from './components/SignUpForm';


import AdminPageComponent from './components/AdminPageComponent';
import NormalPageComponent from './components/NormalPageComponent';
import TestDashboardList from "./components/TestDashboardList";
import ClientsList from "./components/ClientsList";
import ExercisesList from "./components/ExercisesList";
import ClientsList2 from "./components/ClientsList";

//import {Home} from './crud_page/Home';
//import {Create} from './crud_page/Create';

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
//    <ul>
//        {user && user.length > 0 && user.map ( (userObj,index) => (
//        <li key = {userObj._id}> {userObj.email} </li>
//        <div key={ejercicio.id}>
//        <div>
//            Ejercicio: {ejercicio.nombreEjercicio}
//        </div>
//        ))}
//    </ul>
//    <div>
//        {data.map(item => (
//            <p key={item.id}> {item.title} </p>
//        ))}
//    </div>
    <BrowserRouter>
        <br></br>
        <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/logout" element={<LogoutForm/>}/>
            <Route path="/signup" element={<SignUpForm/>}/>
            <Route path="/edit-profile" element={<EditProfile />}/>
            <Route path="/create-exercise" element={<CreateExercise />}/>
            <Route path="/ejercicios" element={<ExercisesList />}/>
            <Route path="/testdashboardlist" element={<TestDashboardList />}/>
            <Route path="/clients" element={<ClientsList />}/>

            <Route path="/form" element={<CustomForm />}/>
            
            <Route path="/dashboard" element={<NormalPageComponent />}/>
            <Route path="/dashboard-admin" element={<AdminPageComponent />}/>

        </Routes>
    </BrowserRouter>
)

}
export default App;
