package aorquerab.fitnexus.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EntrenadorDTORequest {

    private String nombre;
    private String apellido;
    private Boolean asesorNutricional;

}
