package aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.response;

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
public class PlanEntrenamientoGetDTO {

    private Long id;
    private String nombrePlan;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;
    private List<PlanEntrenamientoGetDTO.RutinaDTO> rutinas;

    @Data
    @Builder
    public static class RutinaDTO {
        private String nombreRutina;
        private Long id;
    }

}
