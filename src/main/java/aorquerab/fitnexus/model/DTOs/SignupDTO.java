package aorquerab.fitnexus.model.DTOs;

import aorquerab.fitnexus.model.enumerator.Role;
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
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private Role role;
    private LocalDate clienteDesde;
}
