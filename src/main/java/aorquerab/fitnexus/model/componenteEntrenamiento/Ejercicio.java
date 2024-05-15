package aorquerab.fitnexus.model.componenteEntrenamiento;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@ToString
public class Ejercicio {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty(message = "Nombre no puede ser vacío y el tamaño debe ser mayor que 0!")
    private String nombreEjercicio;

    @Positive(message = "Número de repeticiones no debe ser negativo!")
    private Integer repeticion;

    @Positive (message = "Número de series no debe ser negativo!")
    private Integer serie;

    @Positive (message = "Peso no debe ser negativo!")
    private Integer peso;

    //If using ExerciseRepository extends ListCrudRepository (if using JDBC)
    @Version
    private Integer version;
}
