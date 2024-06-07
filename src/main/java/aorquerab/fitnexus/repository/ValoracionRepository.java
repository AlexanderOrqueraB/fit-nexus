package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.componenteEntrenamiento.Valoracion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ValoracionRepository extends JpaRepository <Valoracion,Long> {
}