package aorquerab.fitnexus.model.componenteEntrenamiento;

import aorquerab.fitnexus.model.users.Cliente;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "plan_de_entrenamiento")
public class PlanDeEntrenamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombrePlan;
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
}
