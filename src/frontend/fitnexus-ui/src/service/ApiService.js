import axios from 'axios';

const EJERCICIO_URL = "http://localhost:8080/api/ejercicio";

class APIService {

    getEjercicios(){
        return axios.get(EJERCICIO_URL);
    }

}

export default new APIService();