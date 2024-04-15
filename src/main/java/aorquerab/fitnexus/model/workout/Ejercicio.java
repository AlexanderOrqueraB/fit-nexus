package aorquerab.fitnexus.model.workout;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Ejercicio {
    @Id
    @GeneratedValue
    private Long id;

}
