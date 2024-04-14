package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.entity.Entrenador;
import org.springframework.data.jpa.repository.JpaRepository;

//TODO: JpaRepository o CrudRepository
public interface EntrenadorRepository extends JpaRepository <Entrenador,Long> {
}
