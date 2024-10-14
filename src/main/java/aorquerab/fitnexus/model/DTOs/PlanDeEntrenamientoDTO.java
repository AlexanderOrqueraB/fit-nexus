package aorquerab.fitnexus.model.DTOs;

import aorquerab.fitnexus.model.DTOs.minimized.RutinaDTOmin;
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
public class PlanDeEntrenamientoDTO {

    private String nombrePlan;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;
    private List<RutinaDTOmin> rutinas;

}
