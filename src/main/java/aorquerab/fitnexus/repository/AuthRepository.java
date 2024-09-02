package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.users.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository extends JpaRepository<Usuario,Long> {
}
