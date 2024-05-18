import React, { Component } from "react";
import APIService from '../service/APIService'

export default class EjercicioComponente extends Component {
    constructor
}

class EjercicioLista extends Component {
    render() {
        if (!this.props.exercises) {
            return <div>Sin ejercicios todavia...</div>
        }
        return (
            <ul id="exercise-list">
                {this.props.exercises.map(exercise => (
                    <li>
                        {exercise.name}
                    </li>
                ))}
            </ul>
        );
    }
}

export default EjercicioLista;