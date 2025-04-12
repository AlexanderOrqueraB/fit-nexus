import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "./components/global/UserContext";
import { ClientDataProvider } from "./components/global/ClientDataContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ClientDataProvider>
      <App />
      </ClientDataProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
