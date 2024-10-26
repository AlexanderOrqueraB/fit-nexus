package aorquerab.fitnexus.model.DTOs;

import aorquerab.fitnexus.model.enumerator.FrecuenciaEjercicioSemanal;
import aorquerab.fitnexus.model.enumerator.Genero;
import aorquerab.fitnexus.model.enumerator.Objetivo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ClienteDTO {

    private Objetivo objetivo;
    private Genero genero;
    private FrecuenciaEjercicioSemanal frecuenciaEjercicioSemanal;
    private Integer edad;
    private Integer peso;
    private Integer altura;
}
