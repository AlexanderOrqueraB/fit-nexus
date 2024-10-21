package aorquerab.fitnexus.model.DTOs;

import aorquerab.fitnexus.model.enumerator.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EntrenadorDTO {

    //form registro
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private Role role;

    private Boolean asesorNutricional;
}
