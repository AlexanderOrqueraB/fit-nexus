package aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RutinaDTO {

    private String nombreRutina;
    private List<EjercicioDTO> ejercicios;

    @Data
    @Builder
    public static class EjercicioDTO {
        private String nombreEjercicio;
    }

}
