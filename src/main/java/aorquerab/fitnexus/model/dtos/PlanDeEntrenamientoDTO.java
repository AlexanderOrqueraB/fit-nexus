package aorquerab.fitnexus.model.dtos;

import aorquerab.fitnexus.model.dtos.minimized.RutinaDTOmin;
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
