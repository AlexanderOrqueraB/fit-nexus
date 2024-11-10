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

    //TODO: Cualquier entrenador puede crear ejercicios que otro entrenador puede usar,
    // se guardan en BBDD accesibles para todos los entrenadores

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

    String planRequestPUT = """
    {
        "nombreEjercicio": "Press banca",
        "repeticion": null,
        "serie": null,
        "peso": 10,
        "cardio": null
    }
    """;
}
