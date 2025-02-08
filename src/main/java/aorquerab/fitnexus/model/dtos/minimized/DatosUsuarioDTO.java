package aorquerab.fitnexus.model.dtos.minimized;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DatosUsuarioDTO {

    private String nombre;
    private String apellido;
    private String email;
    private String fitNexusId;

}
