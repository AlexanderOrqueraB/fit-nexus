package aorquerab.fitnexus.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EjercicioDTO {

    private String nombreEjercicio;
    private Integer repeticion;
    private Integer serie;
    private Integer peso;
    private Boolean cardio;

}
