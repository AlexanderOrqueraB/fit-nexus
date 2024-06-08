package aorquerab.fitnexus.model.componenteEntrenamiento;

import aorquerab.fitnexus.model.users.Entrenador;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "ejercicio")
public class Ejercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nombreEjercicio;

    private Integer repeticion;

    private Integer serie;

    private Integer peso;

    private boolean cardioRealizado;

    @Version
    private Integer version;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entrenador_id", nullable = false)
    @JsonIgnore //To avoid infinite serialization
    private Entrenador entrenador;

    @ManyToMany(mappedBy = "ejercicios", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore //To avoid infinite serialization
    private List<Rutina> rutinas = new ArrayList<>();
}
