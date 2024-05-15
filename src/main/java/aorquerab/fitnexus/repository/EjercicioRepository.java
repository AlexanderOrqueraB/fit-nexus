package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

//This an extension to CrudRepository returning List instead of Iterable where applicable
public interface EjercicioRepository extends ListCrudRepository<Ejercicio,Integer> {

    List<Ejercicio> findAllByNombreEjercicio (String nombreEjercicio);
}
