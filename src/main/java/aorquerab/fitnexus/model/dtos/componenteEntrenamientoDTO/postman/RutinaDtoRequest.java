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
public class RutinaDtoRequest {

    private String nombreRutina;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;
    private Entrenador entrenador;

    @Data
    @Builder
    public static class Entrenador {
        private String email;
    }

    String rutinaRequest = """
    {
        "nombreRutina": "Rutina A",
        "fechaInicio": "2024-06-18",
        "fechaFinal": "2025-06-18",
        "entrenador": {
            "email": {{emailEntrenador}}
        }
    }
    """;
}
