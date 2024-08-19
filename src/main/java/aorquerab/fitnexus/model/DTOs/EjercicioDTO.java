package aorquerab.fitnexus.model.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EjercicioDTO {

    private String nombreEjercicio;
    private Integer repeticion;
    private Integer serie;
    private Integer peso;
    private Boolean cardioRealizado;

}
