package aorquerab.fitnexus.model.DTOs;

import aorquerab.fitnexus.model.enumeration.Genero;
import aorquerab.fitnexus.model.enumeration.Objetivo;
import aorquerab.fitnexus.model.enumeration.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ClienteDTO {

    //login
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private Role role;

    private Objetivo objetivo;
    private Genero genero;
    private Integer edad;
    private Integer peso;
    private Integer altura;
}
