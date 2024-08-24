import axios from "axios"; //(1)
import React, { useRef, useState, useEffect } from "react"; //(2)
import {BrowserRouter, Routes, Route, Switch} from 'react-router-dom'
import {Link} from 'react-router-dom'

import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./components_ui/ui/alert"

import { Button } from "./components_ui/ui/button"

import HeaderComponent from './components/HeaderComponent';

import DialogModal from './components/DialogModal';

import TableComponent from './components/TableComponent';

import CustomForm from './components/CustomForm';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import CustomNavigationMenu from './components/CustomNavigationMenu';

//import {Home} from './crud_page/Home';
//import {Create} from './crud_page/Create';

import {ExercisesPage} from './pages/exercises-page';
import {LoginPage} from './pages/login-page';

function App () {
    const [data, setData] = useState([]); //useState to store data from server

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
        <CustomNavigationMenu /> 
        <Routes>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/signup" element={<SignUpForm/>}/>
            <Route path="/dashboard" element={<ExercisesPage/>}/>
            <Route path="/edit-profile" element={<DialogModal />}/>
            <Route path="/table" element={<TableComponent />}/>
            <Route path="/form" element={<CustomForm />}/>
        </Routes>
    </BrowserRouter>
)

}
export default App;
