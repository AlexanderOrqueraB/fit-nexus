package aorquerab.fitnexus.model.componenteEntrenamiento;

import aorquerab.fitnexus.model.users.Entrenador;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "rutina")
public class Rutina {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_log_gen")
    @SequenceGenerator(name = "seq_log_gen", sequenceName = "seq_log", allocationSize = 1)
    private Long id;

    private String nombreRutina;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;

    @Version
    @JsonIgnore
    private Integer version;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entrenador_id", nullable = false)
    @JsonIgnore
    private Entrenador entrenador;

    @Builder.Default
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
            name = "rutina_ejercicio",
            joinColumns = @JoinColumn(name = "rutina_id"),
            inverseJoinColumns = @JoinColumn(name = "ejercicio_id")
    )
    private List<Ejercicio> ejercicios = new ArrayList<>();

    @Builder.Default
    @ManyToMany(mappedBy = "rutinas", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore //To avoid infinite serialization
    private List<PlanDeEntrenamiento> planDeEntrenamientos = new ArrayList<>();
}
