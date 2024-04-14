package aorquerab.fitnexus.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Entrenador extends Usuario {
    //TODO: Decidir si el cliente puede tener uno o varios entrenadores y reflejarlo en e
    // diagrama de clases
}
