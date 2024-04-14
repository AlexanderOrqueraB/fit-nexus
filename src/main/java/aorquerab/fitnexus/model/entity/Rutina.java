package aorquerab.fitnexus.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Rutina {
    //TODO: - ejercicios: Array <Ejercicio>
    // + agregarEjercicios(Ejercicio ejercicio): void
    // + getEjercicios(): List<Ejercicio>

    //Ejemplo: rutina lunes (press banca, peso muerto, sentadillas...)
    @Id
    @GeneratedValue
    private Long id;
}
