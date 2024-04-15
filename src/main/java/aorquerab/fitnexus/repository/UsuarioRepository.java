package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.users.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

//TODO: JpaRepository o CrudRepository
public interface UsuarioRepository extends JpaRepository <Usuario,Long> {
}
