package aorquerab.fitnexus.repository;

import aorquerab.fitnexus.model.users.Entrenador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EntrenadorRepository extends JpaRepository <Entrenador,Long> {
    Optional<Entrenador> findByEmail (String email);
    Optional<Entrenador> findByFitNexusId (UUID fitNexusId);

}
