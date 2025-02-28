import axios from "axios";

var BASE_URL = 'http://localhost:3000'

if (window.location.port === "8080") {
    console.log("Estas ejecutando el puerto 8080");
    BASE_URL = 'http://localhost:8080'
}

if (window.location.port === "3000") {
    console.log("Estas ejecutando el puerto 3000");
}

export const FITNEXUS_URL = BASE_URL;

export const apiClient = axios.create ({
    baseURL: BASE_URL
})

// const navigate = useNavigate ();
//onClick= {()=> navigate ('/route/routes')}