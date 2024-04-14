package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

//TODO: JpaRepository o CrudRepository
public interface ClienteRepository extends JpaRepository <Cliente,Long> {
}
