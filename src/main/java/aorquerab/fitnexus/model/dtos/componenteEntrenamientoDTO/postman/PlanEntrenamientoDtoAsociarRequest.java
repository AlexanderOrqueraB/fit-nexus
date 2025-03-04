package aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PlanEntrenamientoDtoAsociarRequest {

    private String nombrePlan;
    private Cliente cliente;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Cliente {
        private String email;
    }

}
