package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanDeEntrenamientoRepository extends JpaRepository <PlanDeEntrenamiento,Long> {

    List<PlanDeEntrenamiento> findAllByNombrePlan (String nombrePlan);
}
