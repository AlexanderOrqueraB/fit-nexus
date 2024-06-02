package aorquerab.fitnexus.model.users;

import aorquerab.fitnexus.model.componenteEntrenamiento.*;
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
@Table(name = "cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID fitNexusId;

    private String nombre;
    private String apellido;
    private String nombreDeUsuario;

    private Integer edad;
    private Integer peso;
    private Integer altura;

    private Boolean genero;

    private String email;
    private Integer mediaPasos;
    private String objetivo;

    @ManyToOne
    @JoinColumn(name = "entrenador_id", nullable = false)
    private Entrenador entrenador;

    @ManyToMany
    @JoinTable(
        name = "cliente_pauta_nutricional",
        joinColumns = @JoinColumn(name = "cliente_id"),
        inverseJoinColumns = @JoinColumn(name = "pauta_nutricional_id")
    )
    private ArrayList<PautaNutricional> pautaNutricional;

    @ManyToMany
    @JoinTable(
        name = "cliente_plan_de_entrenamiento",
        joinColumns = @JoinColumn(name = "cliente_id"),
        inverseJoinColumns = @JoinColumn(name = "plan_de_entrenamiento_id")
    )
    private ArrayList<PlanDeEntrenamiento> planDeEntrenamiento;

    @ManyToMany
    @JoinTable(
        name = "cliente_rutina",
        joinColumns = @JoinColumn(name = "cliente_id"),
        inverseJoinColumns = @JoinColumn(name = "rutina_id")
    )
    private ArrayList<Rutina> rutinas;

    @ManyToMany
    @JoinTable(
        name = "cliente_ejercicio",
        joinColumns = @JoinColumn(name = "cliente_id"),
        inverseJoinColumns = @JoinColumn(name = "ejercicio_id")
    )
    private ArrayList<Ejercicio> ejercicios;
}
