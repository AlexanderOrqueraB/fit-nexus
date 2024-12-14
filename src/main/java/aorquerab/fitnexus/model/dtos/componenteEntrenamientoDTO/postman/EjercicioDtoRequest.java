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

}
