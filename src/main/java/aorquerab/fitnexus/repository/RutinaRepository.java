package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RutinaRepository extends JpaRepository <Rutina,Long> {

    List<Rutina> findAllByNombreRutina (String nombreRutina);
    Rutina findByNombreRutina(String nombreRutina);

    //Opcion con consulta SQL Nativa
    @Modifying
    @Transactional
    @Query(
            value = "DELETE FROM rutina_ejercicio " +
                    "WHERE rutina_id = (SELECT id FROM rutina WHERE nombre_rutina = :nombreRutina) " +
                    "AND ejercicio_id IN (SELECT id FROM ejercicio WHERE nombre_ejercicio IN :nombresEjercicios)",
            nativeQuery = true
    )
    void deleteEjerciciosByNombreIn (
            @Param("nombreRutina") String nombreRutina,
            @Param("nombresEjercicios") List<String> nombresEjercicios);

}
