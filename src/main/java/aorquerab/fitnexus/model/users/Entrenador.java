package aorquerab.fitnexus.model.users;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class Entrenador extends Usuario {
    //TODO: Decidir si el cliente puede tener uno o varios entrenadores y reflejarlo en e
    // diagrama de clases
}
