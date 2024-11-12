package aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PlanEntrenamientoDtoFechasRequest {

    private String nombrePlan;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;

    String planRequest = """
    {
        "nombrePlan": "Plan X",
        "fechaInicio": "2024-06-18",
        "fechaFinal": "2025-06-18"
    }
    """;
}
