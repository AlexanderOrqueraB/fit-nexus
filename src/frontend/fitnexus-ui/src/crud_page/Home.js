import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

function Home () {
    const [data, setData] = useState ([]);
    useEffect = (()=> {
        axios.get("http://localhost:8080/api/v1/ejercicios")
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    },[])

    return (
    <div>
    <h2> hola </h2>
    <Link to="/create"> un link de react dom a entrenadores</Link>
        <ul>
            {data && data.length > 0 && data.map ((userObj,index) => (
            <li key = {userObj._id}> {userObj.email} <button>botondentrokey</button></li>
            <li><button>botonfuerakey</button></li>
            ))}
        </ul>
    </div>
    )
}

export default Home;