package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.users.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository <Cliente,Long> {
}
