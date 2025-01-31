package aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman;

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
public class RutinaGetDTO {

    private String nombreRutina;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;
    private List<RutinaGetDTO.EjercicioDTO> ejercicios;

    @Data
    @Builder
    public static class EjercicioDTO {
        private String nombreEjercicio;
    }

}
