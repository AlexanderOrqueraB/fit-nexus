package aorquerab.fitnexus.model.componenteEntrenamiento;

import aorquerab.fitnexus.model.users.Entrenador;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "ejercicio")
public class Ejercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty(message = "Nombre no puede ser vacío y el tamaño debe ser mayor que 0!")
    private String nombreEjercicio;

    @Positive(message = "Número de repeticiones no debe ser negativo!")
    private Integer repeticion;

    @Positive (message = "Número de series no debe ser negativo!")
    private Integer serie;

    @Positive (message = "Peso no debe ser negativo!")
    private Integer peso;

    //cardioRealizado allow us to use Ejercicio for cardio exercises
    private boolean cardioRealizado;

    //If using ExerciseRepository extends ListCrudRepository (if using JDBC)
    @Version
    private Integer version;

    @ManyToOne
    @JoinColumn(name = "entrenador_id", nullable = false)
    private Entrenador entrenador;
}
