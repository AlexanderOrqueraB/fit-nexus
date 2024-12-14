package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import aorquerab.fitnexus.model.users.Entrenador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlanDeEntrenamientoRepository extends JpaRepository <PlanDeEntrenamiento,Long> {

    List<PlanDeEntrenamiento> findAllByNombrePlan (String nombrePlan);
    Optional<Entrenador> findByEntrenador_Email(String email);
    Optional<PlanDeEntrenamiento> findByNombrePlan (String nombrePlan);
}
