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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from './components_ui/ui/navigation-menu'

import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

import AlertDestructive from './components/AlertDestructive';

import DialogModal from './components/DialogModal';

import TableComponent from './components/TableComponent';

import CustomForm from './components/CustomForm';

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
        <HeaderComponent />

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item two</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link2</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/dashboard" element={<ExercisesPage/>}/>
            <Route path="/edit-profile" element={<DialogModal />}/>
            <Route path="/table" element={<TableComponent />}/>
            <Route path="/form" element={<CustomForm />}/>
        </Routes>

        <FooterComponent />
        <AlertDestructive />
        <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                1 Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
    </BrowserRouter>
)

}
export default App;
