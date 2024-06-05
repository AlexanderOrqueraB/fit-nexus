package aorquerab.fitnexus.model.componenteEntrenamiento;

import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "plan_de_entrenamiento")
public class PlanDeEntrenamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nombrePlan;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;

    @Version
    private Integer version;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "entrenador_id", nullable = false)
    private Entrenador entrenador;

    @ManyToMany (mappedBy = "planDeEntrenamiento")
    private List<Valoracion> valoraciones = new ArrayList<>();

    @ManyToMany
    @JoinTable (
            name = "plan_de_entrenamiento_rutina",
            joinColumns = @JoinColumn(name= "plan_de_entrenamiento_id"),
            inverseJoinColumns = @JoinColumn(name= "rutina_id")
    )
    private List<Rutina> rutinas = new ArrayList<>();

}
