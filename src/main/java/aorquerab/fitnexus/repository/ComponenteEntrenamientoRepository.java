package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.entity.ComponenteEntrenamiento;
import org.springframework.data.jpa.repository.JpaRepository;

//TODO: JpaRepository o CrudRepository
//TODO: ComponenteEntrenamiento o ComponenteDeEntrenamiento
public interface ComponenteEntrenamientoRepository extends JpaRepository <ComponenteEntrenamiento,Long> {
}
