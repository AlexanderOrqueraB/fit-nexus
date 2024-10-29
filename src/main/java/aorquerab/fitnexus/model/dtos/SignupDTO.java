package aorquerab.fitnexus.model.dtos;

import aorquerab.fitnexus.model.enumerator.Role;
import aorquerab.fitnexus.model.users.Entrenador;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SignupDTO {
    //Setteados por el sistema
    private UUID fitNexusId;
    private LocalDate clienteDesde;

    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private Role role;

    //Cliente
    private Entrenador entrenador;
    //Entrenador
    private Boolean asesorNutricional;
}
