package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.entity.PlanDeEntrenamiento;
import org.springframework.data.jpa.repository.JpaRepository;

//TODO: JpaRepository o CrudRepository
public interface PlanDeEntrenamientoRepository extends JpaRepository <PlanDeEntrenamiento,Long> {
}