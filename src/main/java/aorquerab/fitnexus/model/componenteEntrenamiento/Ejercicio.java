package aorquerab.fitnexus.model.componenteEntrenamiento;

import aorquerab.fitnexus.model.users.Entrenador;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@ToString(exclude = {"entrenador", "rutinas"}) //To avoid circular references when logging entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "ejercicio")
public class Ejercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_log_gen")
    @SequenceGenerator(name = "seq_log_gen", sequenceName = "seq_log", allocationSize = 1)
    private Long id;

    private String nombreEjercicio;

    private Integer repeticion;

    private Integer serie;

    private Integer peso;

    private Boolean cardio;

    @Version
    @JsonIgnore
    private Integer version;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entrenador_id", nullable = false)
    @JsonIgnore //To avoid infinite serialization
    private Entrenador entrenador;

    @Builder.Default
    @ManyToMany(mappedBy = "ejercicios", fetch = FetchType.LAZY)
    @JsonIgnore //To avoid infinite serialization
    private List<Rutina> rutinas = new ArrayList<>();
}
