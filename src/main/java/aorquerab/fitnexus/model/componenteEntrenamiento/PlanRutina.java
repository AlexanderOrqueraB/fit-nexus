package aorquerab.fitnexus.model.componenteEntrenamiento;

import jakarta.persistence.*;
import lombok.*;

@ToString
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "plan_de_entrenamiento_rutina")
public class PlanRutina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plan_de_entrenamiento_id")
    private Long planDeEntrenamientoId;

    @Column(name = "rutina_id")
    private Long rutinaId;

}