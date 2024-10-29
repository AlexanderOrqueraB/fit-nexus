package aorquerab.fitnexus.model.dtos.minimized;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RutinaDTOmin {

    private String nombreRutina;
    private List<EjercicioDTOmin> ejercicios;

}
