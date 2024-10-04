import axios from "axios"; //(1)
import React, { useRef, useState, useEffect } from "react"; //(2)
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./components_ui/ui/alert"

import { Button } from "./components_ui/ui/button"

import HeaderComponent from './components/HeaderComponent';

import EditProfile from './components/EditProfile';
import CreateExercise from './components/CreateExercise';

import ExerciseComponent from './components/ExerciseComponent';

import CustomForm from './components/CustomForm';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';


import AdminPageComponent from './components/AdminPageComponent';
import NormalPageComponent from './components/NormalPageComponent';

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
//    const api = axios.create({
//        baseURL: "http://localhost:8080/api/",
//        headers: {
//            "Content-type": "application/json"
//        }
//    });
//
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
            <Route path="/signup" element={<SignUpForm/>}/>
            <Route path="/edit-profile" element={<EditProfile />}/>
            <Route path="/create-exercise" element={<CreateExercise />}/>
            <Route path="/ejercicios" element={<ExerciseComponent />}/>
            {/*<Route path="/adminpage"
                element={userRole === "ADMIN" ? <AdminPageComponent /> : <Navigate to="/" />}
            />
            <Route path="/normalpage"
                element={userRole === "USER" ? <NormalPageComponent /> : <Navigate to="/" />}
            /> */}
            <Route path="/form" element={<CustomForm />}/>
            
            <Route path="/dashboard" element={<NormalPageComponent />}/>
            <Route path="/dashboard-admin" element={<AdminPageComponent />}/>

        </Routes>
    </BrowserRouter>
)

}
export default App;
