package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.workout.PautaNutricional;
import org.springframework.data.jpa.repository.JpaRepository;

//TODO: JpaRepository o CrudRepository
public interface PautaNutricionalRepository extends JpaRepository <PautaNutricional,Long> {
}
