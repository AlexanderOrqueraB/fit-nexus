package aorquerab.fitnexus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface RutinaEjercicioRepository extends JpaRepository<Object,Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO rutina_ejercicio (rutina_id, ejercicio_id) " +
            "VALUES (:rutinaId, :ejercicioId) " +
            "ON CONFLICT DO NOTHING", nativeQuery = true)
    void addEjercicioToRutina(
            @Param("rutinaId") Long rutinaId,
            @Param("ejercicioId") Long ejercicioId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM rutina_ejercicio " +
            "WHERE rutina_id = :rutinaId AND ejercicio_id = :ejercicioId", nativeQuery = true)
    void deleteEjercicioFromRutina(
            @Param("rutinaId") Long rutinaId,
            @Param("ejercicioId") Long ejercicioId);

}
