package aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO;

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
    private List<RutinaDTO> rutinas;
    private Entrenador entrenador;
    private Cliente cliente;

    @Data
    @Builder
    public static class RutinaDTO {

        private String nombreRutina;
        private List<EjercicioDTOmin> ejercicios;

        @AllArgsConstructor
        @NoArgsConstructor
        @Data
        @Builder
        public static class EjercicioDTOmin {
            private String nombreEjercicio;
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Entrenador {
        private String email;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Cliente {
        private String email;
    }
}
