package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//This an extension to ListCrudRepository which extends from
//CrudRepository returning List instead of Iterable where applicable
public interface EjercicioRepository extends JpaRepository<Ejercicio,Long> {

    List<Ejercicio> findAllByNombreEjercicio (String nombreEjercicio);
    Ejercicio findByNombreEjercicio (String nombreEjercicio);
}
