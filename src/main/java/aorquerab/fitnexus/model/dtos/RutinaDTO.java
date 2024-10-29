package aorquerab.fitnexus.model.dtos;

import aorquerab.fitnexus.model.dtos.minimized.EjercicioDTOmin;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RutinaDTO {

    private String nombreRutina;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;
    List<EjercicioDTOmin> ejercicios;

}