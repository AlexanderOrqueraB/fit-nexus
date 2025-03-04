package aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RutinasListDTO {

    private List<RutinaDTO> rutinas;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class RutinaDTO {
        private String nombreRutina;
        private Long id;
    }

}
