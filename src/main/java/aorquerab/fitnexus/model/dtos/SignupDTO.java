package aorquerab.fitnexus.model.dtos;

import aorquerab.fitnexus.model.enumerator.Role;
import aorquerab.fitnexus.model.users.Entrenador;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SignupDTO {

    //Setteados por el sistema
    private LocalDate usuarioDesde;

    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private Role role;

    //Cliente
    private Entrenador entrenador;
    private String fitNexusId;

}
