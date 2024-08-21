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

    <button> SUBMIT </button>
    </form>
    )
}

export default Home;