package aorquerab.fitnexus.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PlanNutricionalPorcenajesDTO {

    private int proteina;
    private int hidratoDeCarbono;
    private int grasa;
    private int kcal;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;

}
