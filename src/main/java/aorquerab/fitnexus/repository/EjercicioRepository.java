package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.entity.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;

//TODO: JpaRepository o CrudRepository
public interface EjercicioRepository extends JpaRepository <Ejercicio,Long> {
}