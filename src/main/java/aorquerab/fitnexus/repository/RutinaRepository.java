package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RutinaRepository extends JpaRepository <Rutina,Long> {

    List<Rutina> findAllByNombreRutina (String nombreRutina);

    Rutina findByNombreRutina(String nombreRutina);

    void deleteAllById(List<String> listaEjerciciosPorNombre, Rutina rutinaPorNombre);

    void deleteByNombreEjercicioIn(List<String> listaEjerciciosPorNombre);
}
