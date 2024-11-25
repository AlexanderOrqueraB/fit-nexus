import axios from "axios";

var baseURL = 'https://localhost:3000'

if (window.location.port == "8080") {
    console.log("Estas ejecutando el puerto 8080");
    baseURL = 'https://localhost:8080'
}

if (window.location.port == "3000") {
    console.log("Estas ejecutando el puerto 3000");
}

export const FITNEXUS_URL = baseURL;

export const apiClient = axios.create ({
    baseURL: baseURL
})

// const navigate = useNavigate ();
//onClick= {()=> navigate ('/route/routes')}