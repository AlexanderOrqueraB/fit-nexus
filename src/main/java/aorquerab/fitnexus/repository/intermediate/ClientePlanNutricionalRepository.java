package aorquerab.fitnexus.repository.intermediate;

import aorquerab.fitnexus.model.componenteEntrenamiento.ClientePlanNutricional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ClientePlanNutricionalRepository extends JpaRepository<ClientePlanNutricional,Long> {

        List<ClientePlanNutricional> findByClienteId(Long clienteId);
        List<ClientePlanNutricional> findByPlanNutricionalId(Long planNutricionalId);

        @Modifying
        @Transactional
        @Query(value = "INSERT INTO cliente_plan_nutricional (cliente_id, plan_nutricional_id) " +
            "VALUES (:clienteId, :planNutricionalId) " +
            "ON CONFLICT DO NOTHING", nativeQuery = true)
        void addPlanNutricionalToCliente(
            @Param("clienteId") Long clienteId,
            @Param("planNutricionalId") Long planNutricionalId);

}
