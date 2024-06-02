package aorquerab.fitnexus.model.componenteEntrenamiento;

import aorquerab.fitnexus.model.users.Entrenador;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
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

    @ManyToOne
    @JoinColumn(name = "entrenador_id", nullable = false)
    private Entrenador entrenador;
}
