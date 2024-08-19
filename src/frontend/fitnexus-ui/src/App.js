import axios from "axios"; //(1)
import React, { useRef, useState, useEffect } from "react"; //(2)

import logo from './logo.svg';
import './App.css';
import { Button } from "./components_ui/ui/button"
import { Loader2 } from "lucide-react"

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
//import apiClient from "./http-common";


//Example using useEffect hook (1) and (2) needed
//function App () {
//    const [data, setData] = useState([]);
//        //useState to store data from server
//    useEffect( () => {
//        axios.get("http://localhost:8080/api/")
//            .then(response => {
//                setData(response.data);
//            })
//            .catch(error => {
//                console.log(error);
//            });
//    }, []); //empty array ensures that the effect only runs once
//return (
//    <div>
//        {data.map(item => (
//            <p key={item.id}> {item.title} </p>
//        ))}
//    </div>
//);
//}
//export default App;


/*ANOTHER RANDOM EXAMPLE using useEffect and useState
Build React Crud App with JSON Server | React Crud Operation with API using Axios | React-Router
import React, { useState, useEffect } from "react";

-----inside App ():

const [user, setUser] = useState ([]);

const fetchData = () => {
    return axios.get("http.../whatever")
    .then((response) => setUser(response.data));
}

useEffect( () => {
    fetchData();
}, [])

---- inside return ():
    <h1>TEST</h1>
    <ul>
        {user && user.length > 0 && user.map ( (userObj,index) => (
        <li key = {userObj._id}> {userObj.email} </li>
        ))}
    </ul>
*/


const api = axios.create({
    baseURL: "http://localhost:8080/api/",
    headers: {
        "Content-type": "application/json"
    }
});

function App() {
  const get_id = useRef([]);
  const get_nombreEjercicio = useRef([]);

  const [getResult, setGetResult] = useState([]);

  const formatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  async function getAllEjercicios() {
    try {
      const res = await api.get('ejercicio');

      const result = {
        //status: res.status + "-" + res.statusText,
        //headers: res.headers,
        data: res.data,
      };

      setGetResult(formatResponse(result));
    } catch (err) {
      setGetResult(formatResponse(err.response?.data || err));
    }
  }

  async function getEjercicioById() {
    const id = get_id.current.value;

    if (id) {
      try {
        const res = await api.get(`ejercicio/${id}`);

        const result = {
          data: res.data,
          //status: res.status,
          //statusText: res.statusText,
          //headers: res.headers,
        };

        setGetResult(formatResponse(result));
      } catch (err) {
        setGetResult(formatResponse(err.response?.data || err));
      }
    }
  }

  async function getNombreByEjercicio() {
    const nombreEjercicio = get_nombreEjercicio.current.value;

    if (nombreEjercicio) {
      try {
        // const res = await instance.get(`/tutorials?title=${title}`);
        const res = await api.get('ejercicio', {
          params: {
            nombreEjercicio: nombreEjercicio,
          },
        });

        const result = {
          //status: res.status + "-" + res.statusText,
          //headers: res.headers,
          data: res.data,
        };

        setGetResult(formatResponse(result));
      } catch (err) {
        setGetResult(formatResponse(err.response?.data || err));
      }

    render () {
      const {ejercicios} = this.state;
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Button variant="outline">Button</Button>
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
            <div className="App-intro">
                <h2>Ejercicios</h2>
                {ejercicios.map(ejercicio =>
                    <div key={ejercicio.id}>
                    <div>
                        Ejercicio: {ejercicio.nombreEjercicio}
                    </div>
                    <div>
                        Repeticiones: {ejercicio.repeticion}
                    </div>
                    <div>
                        Series: {ejercicio.serie}
                    </div>
                    <div>
                        Peso: {ejercicio.peso}
                    </div>
                <h3> ------- </h3>
                </div>
                )}
                </div>
          </header>
        </div>
      );
    }
  }

  const clearGetOutput = () => {
    setGetResult(null);
  };

//return ejemplo bootstrap
//  return (
//    <div id="app" className="container">
//      <div className="card">
//        <div className="card-header"> FitNexus - Ejercicio - GET</div>
//        <div className="card-body">
//          <div className="input-group input-group-sm">
//            <button className="btn btn-sm btn-primary" onClick={getAllEjercicios}>Obtener ejercicios</button>
//
//            <input type="text" ref={get_id} className="form-control ml-2" placeholder="Id del ejercicio" />
//            <div className="input-group-append">
//              <button className="btn btn-sm btn-primary" onClick={getEjercicioById}>Obtener ejercicios por Id</button>
//            </div>
//
//            <input type="text" ref={get_nombreEjercicio} className="form-control ml-2" placeholder="Nombre" />
//            <div className="input-group-append">
//              <button className="btn btn-sm btn-primary" onClick={getNombreByEjercicio}>Buscar ejercicio por nombre</button>
//            </div>
//
//            <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>
//          </div>
//
//          { getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div> }
//        </div>
//      </div>
//    </div>
//  );

  //return usando footer y header
  return (
      <div>
          <Router>
                <HeaderComponent />
//                  <div className="container">
//                      <Switch>

//                      </Switch>
//                  </div>
                <FooterComponent />
          </Router>
      </div>

    );
}

//class App extends Component {
//    state = {
//        ejercicios: []
//    };
//
//    async componentDidMount() {
//    const response = await fetch ('/api/ejercicio');
//    const body = await response.json();
//    this.setState({ejercicios: body});
//    }
//
//    render () {
//      const {ejercicios} = this.state;
//      return (
//        <div className="App">
//          <header className="App-header">
//            <img src={logo} className="App-logo" alt="logo" />
//            <div className="App-intro">
//                <h2>Ejercicios</h2>
//                {ejercicios.map(ejercicio =>
//                    <div key={ejercicio.id}>
//                    <div>
//                        Ejercicio: {ejercicio.nombreEjercicio}
//                    </div>
//                    <div>
//                        Repeticiones: {ejercicio.repeticion}
//                    </div>
//                    <div>
//                        Series: {ejercicio.serie}
//                    </div>
//                    <div>
//                        Peso: {ejercicio.peso}
//                    </div>
//                <h3> ------- </h3>
//                </div>
//                )}
//                </div>
//          </header>
//        </div>
//      );
//    }
//}
//
export default App;
