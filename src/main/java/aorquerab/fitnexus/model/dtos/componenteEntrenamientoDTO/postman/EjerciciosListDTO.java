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
public class EjerciciosListDTO {

    private List<EjercicioDTO> ejercicios;

    @Data
    @Builder
    public static class EjercicioDTO {
        private String nombreEjercicio;
    }

}
