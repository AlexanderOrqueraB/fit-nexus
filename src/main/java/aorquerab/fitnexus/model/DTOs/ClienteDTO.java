package aorquerab.fitnexus.model.DTOs;

import aorquerab.fitnexus.model.enumerator.FrecuenciaEjercicioSemanal;
import aorquerab.fitnexus.model.enumerator.Genero;
import aorquerab.fitnexus.model.enumerator.Objetivo;
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
public class ClienteDTO {

    //form registro
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private Role role;

    private Objetivo objetivo;
    private Genero genero;
    private FrecuenciaEjercicioSemanal frecuenciaEjercicioSemanal;
    private Integer edad;
    private Integer peso;
    private Integer altura;
    private LocalDate clienteDesde;
}
