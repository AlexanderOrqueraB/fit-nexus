package aorquerab.fitnexus.model.workout;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@ToString
public class Ejercicio {
    private Integer id;

    @NotEmpty(message = "Nombre no puede ser vacío y el tamaño debe ser mayor que 0!")
    private String nombreEjercicio;

    @Positive(message = "Número de repeticiones no debe ser negativo")
    private Integer repeticion;

    @Positive (message = "Número de series no debe ser negativo")
    private Integer serie;

    @Positive (message = "Peso no debe ser negativo")
    private Integer peso;

}
