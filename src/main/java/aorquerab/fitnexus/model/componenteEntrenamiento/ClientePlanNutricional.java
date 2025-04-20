package aorquerab.fitnexus.model.componenteEntrenamiento;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "cliente_plan_nutricional")
public class ClientePlanNutricional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cliente_id")
    private Long clienteId;

    @Column(name = "plan_nutricional_id")
    private Long planNutricionalId;

}