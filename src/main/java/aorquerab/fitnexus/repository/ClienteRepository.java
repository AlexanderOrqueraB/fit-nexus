package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.users.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository <Cliente,Long> {
    Optional<Cliente> findByEmail (String email);
}
