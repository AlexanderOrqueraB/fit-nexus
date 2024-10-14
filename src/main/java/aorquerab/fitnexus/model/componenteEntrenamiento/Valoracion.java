package aorquerab.fitnexus.model.componenteEntrenamiento;

import aorquerab.fitnexus.model.users.Cliente;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "valoracion")
public class Valoracion {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_log_gen")
    @SequenceGenerator(name = "seq_log_gen", sequenceName = "seq_log", allocationSize = 1)
    private Long id;

    private String comentario;

    @Version
    @JsonIgnore
    private Integer version;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable (
        name = "valoracion_cliente",
        joinColumns = @JoinColumn (name = "valoracion_id"),
        inverseJoinColumns = @JoinColumn (name = "cliente_id")
    )
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable (
          name = "valoracion_plan_de_entrenamiento",
          joinColumns = @JoinColumn(name="valoracion_id"),
          inverseJoinColumns = @JoinColumn (name = "plan_de_entrenamiento_id")
    )
    private PlanDeEntrenamiento planDeEntrenamiento;
}
