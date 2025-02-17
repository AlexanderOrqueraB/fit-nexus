package aorquerab.fitnexus.repository.intermediate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PlanRutinaRepository extends JpaRepository<Object,Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO plan_de_entrenamiento_rutina (plan_de_entrenamiento_id, rutina_id) " +
            "VALUES (:planId, :rutinaId) " +
            "ON CONFLICT DO NOTHING", nativeQuery = true)
    void addRutinaToPlan(
            @Param("planId") Long planId,
            @Param("rutinaId") Long rutinaId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM plan_de_entrenamiento_rutina " +
            "WHERE plan_de_entrenamiento_id = :planId AND rutina_id = :rutinaId", nativeQuery = true)
    void deleteRutinaFromPlan(
            @Param("planId") Long rutinaId,
            @Param("rutinaId") Long ejercicioId);

}
