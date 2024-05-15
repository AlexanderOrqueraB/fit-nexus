import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';

class App extends Component {
    state = {
        ejercicios: []
    };

    async componentDidMount() {
    const response = await fetch ('/api/ejercicio');
    const body = await response.json();
    this.setState({ejercicios: body});
    }

    render () {
      const {ejercicios} = this.state;
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
                <h2>Ejercicios</h2>
                {ejercicios.map(ejercicio =>
                    <div key={ejercicio.id}>
                        {ejercicio.repeticion} ({ejercicio.serie})
                    </div>
                )}
                </div>
          </header>
        </div>
      );
    }
}

export default App;
