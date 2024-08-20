import React from "react";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function Create () {
    const [inputData, setInputData] = useState ({
        name: '',
        email: ''
    })

    const navigate = useNavigate ();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/v1/ejercicios',inputData)
                    .then(response => {
                        alert("POST EJERCICOS HECHO")
                        navigate('/')
                    })
                    .catch(error => console.log(error))
    }

    return (
    <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor: "name"> Name: </label>
        <input type="text" name ='name' className='form-control'
        onChange = {e=>setInputData({...inputData, name: e.target.value})}/>
    </div>

    <div>
        <label htmlFor: "email"> Email: </label>
        <input type="email" name ='email' className='form-control'
        onChange = {e=>setInputData({...inputData, email: e.target.value})}/>
    </div>
    <button> SUBMIT </button>
    </form>
    )
}

export default Home;