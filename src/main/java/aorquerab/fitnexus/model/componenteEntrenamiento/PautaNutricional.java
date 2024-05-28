package aorquerab.fitnexus.model.componenteEntrenamiento;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
public class PautaNutricional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int proteina;
    private int hidratoDeCarbono;
    private int grasa;
    private int kcal;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;
}
