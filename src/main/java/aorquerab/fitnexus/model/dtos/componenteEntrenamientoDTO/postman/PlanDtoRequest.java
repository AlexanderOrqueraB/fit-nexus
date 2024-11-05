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
public class PlanDtoRequest {

    private String nombrePlan;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;
    private Cliente cliente;
    private Entrenador entrenador;

    @Data
    @Builder
    public static class Cliente {
        private String email;
    }

    @Data
    @Builder
    public static class Entrenador {
        private String email;
    }

    String planRequest = """
    {
        "nombrePlan": "Plan X",
        "fechaInicio": "2024-06-18",
        "fechaFinal": "2025-06-18",
        "cliente": {
            "email": {{emailCliente}}
        },
        "entrenador": {
            "email": {{emailEntrenador}}
        }
    }
    """;
}
