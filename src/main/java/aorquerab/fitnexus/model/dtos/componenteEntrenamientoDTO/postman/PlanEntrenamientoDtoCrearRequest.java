package aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PlanEntrenamientoDtoCrearRequest {

    private String nombrePlan;
    private Entrenador entrenador;

    @Data
    @Builder
    public static class Entrenador {
        private String email;
    }

    String planRequest = """
    {
        "nombrePlan": "Plan X",
        "entrenador": {
            "email": {{emailEntrenador}}
        }
    }
    """;
}
