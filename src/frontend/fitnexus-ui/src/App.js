import axios from "axios"; //(1)
import React, { useRef, useState, useEffect } from "react"; //(2)
import {BrowserRouter, Routes, Route, Switch} from 'react-router-dom'

import { Button } from "./components_ui/ui/button"
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App () {
    const [data, setData] = useState([]); //useState to store data from server

    const api = axios.create({
        baseURL: "http://localhost:8080/api/",
        headers: {
            "Content-type": "application/json"
        }
    });

    const fetchData = () => {
        axios.get(baseURL)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect( () => {
        fetchData();
    }, []) //empty array ensures that the effect only runs once

return (
    <ul>
        {user && user.length > 0 && user.map ( (userObj,index) => (
        <li key = {userObj._id}> {userObj.email} </li>
        <div key={ejercicio.id}>
        <div>
            Ejercicio: {ejercicio.nombreEjercicio}
        </div>
        ))}
    </ul>
    <div>
        {data.map(item => (
            <p key={item.id}> {item.title} </p>
        ))}
    </div>
    <BrowserRouter>
            <HeaderComponent />
                <Routes>
                    <Route path="/" element={<Home/>}>     </Route>
                    <Route path="/create" element={<Create/>}>     </Route>
                </Routes>
            <FooterComponent />
        </BrowserRouter>
);
}
export default App;
