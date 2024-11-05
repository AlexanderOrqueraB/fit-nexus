package aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EjercicioDtoRequest {

    //TODO: El ejercicio existe como tal, no tiene relación con el cliente (ni en BBDD)
    // quizas sin con el entrenador que lo ha creado (un entrenador no puede usar
    // ejercicios de otro entrenador)

    private String nombreEjercicio;
    private Integer repeticion;
    private Integer serie;
    private Integer peso;
    private Boolean cardio;

    String planRequest = """
    {
        "nombreEjercicio": "Press banca",
        "repeticion": 5,
        "serie": 5,
        "peso": 10,
        "cardio": false
    }
    """;
}
