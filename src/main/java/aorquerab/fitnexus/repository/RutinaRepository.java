package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.workout.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;

//TODO: JpaRepository o CrudRepository
public interface RutinaRepository extends JpaRepository <Rutina,Long> {
}
