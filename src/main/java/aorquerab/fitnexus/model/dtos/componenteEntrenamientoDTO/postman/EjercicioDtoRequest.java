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

    private String nombreEjercicio;
    private Integer repeticion;
    private Integer serie;
    private Integer peso;
    private Boolean cardio;

}
