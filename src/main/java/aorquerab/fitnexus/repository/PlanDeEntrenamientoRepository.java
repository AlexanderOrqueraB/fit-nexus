package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanDeEntrenamientoRepository extends JpaRepository <PlanDeEntrenamiento,Long> {
}
