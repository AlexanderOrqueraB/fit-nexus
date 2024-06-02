package aorquerab.fitnexus.model.users;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.componenteEntrenamiento.PautaNutricional;
import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "entrenador")
public class Entrenador {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private UUID fitNexusId;

    private String nombre;
    private String apellido;
    private String nombreDeUsuario;

    private String email;

    private Boolean asesorNutricional;

    @Version
    private Integer version;

    @OneToMany(mappedBy = "entrenador")
    private ArrayList<Cliente> clientes;

    @OneToMany(mappedBy = "entrenador")
    private ArrayList<PautaNutricional> pautasNutricionales;

    @OneToMany(mappedBy = "entrenador")
    private ArrayList<PlanDeEntrenamiento> planesDeEntrenamiento;

    @OneToMany(mappedBy = "entrenador")
    private ArrayList<Rutina> rutinas;

    @OneToMany(mappedBy = "entrenador")
    private ArrayList<Ejercicio> ejercicios;
}
