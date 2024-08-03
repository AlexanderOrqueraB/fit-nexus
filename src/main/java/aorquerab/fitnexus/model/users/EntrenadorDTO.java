package aorquerab.fitnexus.model.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EntrenadorDTO {

    //private UUID fitNexusId;

    private String nombre;
    private String apellido;
    private String nombreDeUsuario;
    private String email;
    private Boolean asesorNutricional;

    //private Integer version;
}
